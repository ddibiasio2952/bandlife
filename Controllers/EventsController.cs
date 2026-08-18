using BandLife.Authorization;
using BandLife.Data;
using BandLife.Models.Domain;
using BandLife.Models.DTOs;
using BandLife.Models.DTOs.Events;
using BandLife.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.CodeAnalysis.Options;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Sockets;
using System.Threading.Tasks;
using static System.Net.Mime.MediaTypeNames;

namespace BandLife.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class EventsController : ControllerBase
    {
        private readonly BandLifeDbContext _context;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly PaycheckService _paycheckService;

        public EventsController(
            BandLifeDbContext context, 
            UserManager<ApplicationUser> userManager,
            PaycheckService paycheckService)
        {
            _context = context;
            _userManager = userManager;
            _paycheckService = paycheckService;
        }

        // GET: api/Events
        [Authorize(Roles = AppRoles.User + "," + AppRoles.Moderator + "," + AppRoles.Admin)]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Event>>> GetEvents()
        {
            var events = await _context.Events
                .AsNoTracking()
                .Select(e => new EventResponseDto
                {
                    Id = e.Id,
                    Name = e.Name,
                    Category = e.Category,
                    Description = e.Description,

                    Options = e.Options
                        .Select(option => new EventOptionResponseDto
                        {
                            Id = option.Id,
                            Text = option.Text,
                            Outcome = option.Outcome,
                            MembersModifier = option.MembersModifier,
                            NewJob = option.NewJob,
                            JobIncomeModifier = option.JobIncomeModifier,
                            BandIncomeModifier = option.BandIncomeModifier,
                            NewPopularityLevel = option.NewPopularityLevel,
                            ListenersModifier = option.ListenersModifier,
                            EventId = option.EventId
                        })
                        .ToList()
                })
                .ToListAsync();

            return Ok(events);
        }

        // GET: api/Events/#
        [Authorize(Roles = AppRoles.User + "," + AppRoles.Moderator + "," + AppRoles.Admin)]
        [HttpGet("{id:int}")]
        public async Task<ActionResult<Event>> GetEvent(int id)
        {
            var eventItem = await _context.Events
                .AsNoTracking()
                .Where(e => e.Id == id)
                .Select(e => new EventResponseDto
                {
                    Id = e.Id,
                    Name = e.Name,
                    Category = e.Category,
                    Description = e.Description,

                    Options = e.Options
                        .Select(option => new EventOptionResponseDto
                        {       
                            Id = option.Id,
                            Text = option.Text,
                            Outcome = option.Outcome,
                            MembersModifier = option.MembersModifier,
                            NewJob = option.NewJob,
                            JobIncomeModifier = option.JobIncomeModifier,
                            BandIncomeModifier = option.BandIncomeModifier,
                            NewPopularityLevel = option.NewPopularityLevel,
                            ListenersModifier = option.ListenersModifier,
                            EventId = option.EventId
                        })
                        .ToList()
                })
                .FirstOrDefaultAsync();

            if (eventItem == null)
            {
                return NotFound();
            }

            return Ok(eventItem);
        }

        // POST: api/Events
        [Authorize(Roles = AppRoles.Moderator + "," + AppRoles.Admin)]
        [HttpPost]
        public async Task<ActionResult> CreateEvent(CreateEventRequest request)
        {
            // Reject less than two options
            if (request.Options.Count < 2)
            {
                return BadRequest(
                    "An event must have at least two options.");
            }

            // Reject more than 4 options
            if (request.Options.Count > 4)
            {
                return BadRequest(
                    "An event must have less than five options.");
            }

            // Create parent Event
            var eventItem = new Event
            {
                Name = request.Name,
                Category = request.Category,
                Description = request.Description,

                // Convert each Option into an EventOption
                Options = request.Options
                    .Select(optionRequest => new EventOption
                    {
                        Text = optionRequest.Text,
                        Outcome = optionRequest.Outcome,
                        MembersModifier = optionRequest.MembersModifier,
                        NewJob = optionRequest.NewJob,
                        JobIncomeModifier = optionRequest.JobIncomeModifier,
                        BandIncomeModifier = optionRequest.BandIncomeModifier,
                        NewPopularityLevel = optionRequest.NewPopularityLevel,
                        ListenersModifier = optionRequest.ListenersModifier
                    })
                    .ToList()
            };

            // Add entire object structure
            _context.Events.Add(eventItem);

            // Save Event and Options
            await _context.SaveChangesAsync();

            return Created(
                $"/api/events/{eventItem.Id}",
                new
                {
                    eventItem.Id,
                    Message = "Event created successfully."
                });
        }

        // POST: api/Events/#/choose
        // For a user choosing an option to play
        [Authorize(Roles = AppRoles.User + "," + AppRoles.Moderator + "," + AppRoles.Admin)]
        [HttpPost("{eventId:int}/choose")]
        public async Task<IActionResult> ChooseEventOption(int eventId, ChooseEventOptionDto request)
        {
            var user = await _userManager.GetUserAsync(User);

            if (user == null)
            {
                return Unauthorized();
            }
            var selectedOption = await _context.EventOptions
                .AsNoTracking()
                .FirstOrDefaultAsync(option =>
            option.Id == request.EventOptionId);

            if (selectedOption is null)
            {
                return NotFound(new
                {
                    message = "The selected option does not exist.",
                    receivedOptionId = request.EventOptionId
                });
            }

            if (selectedOption.EventId != eventId)
            {
                return BadRequest(new
                {
                    message = "The selected option does not belong to this event.",
                    receivedEventId = eventId,
                    receivedOptionId = request.EventOptionId,
                    optionEventId = selectedOption.EventId
                });
            }

            // Assign new Status array with previous Status array and selectedOption.Outcome
            user.Status = [.. user.Status, selectedOption.Outcome];

            user.Members += selectedOption.MembersModifier;
            user.Events += 1;

            


            // Apply replacement values only when an option provides a new Job
            if (!string.IsNullOrWhiteSpace(selectedOption.NewJob))
            {
                var now = DateTimeOffset.UtcNow;

                // Pay outstanding wages from the current job before changing it.
                _paycheckService.ApplyPendingPaychecks(user);

                // Change Job properties
                user.Job = selectedOption.NewJob;
                user.JobIncome = selectedOption.JobIncomeModifier;

                // Start new Job and Paycheck period
                user.JobStart = now;
                user.LastPaycheckAt = now;
            }

            // Add Band Income to Bank Account
            user.BankAccount += selectedOption.BandIncomeModifier;

            // Apply replacement values only when an option provides one
            if (!string.IsNullOrWhiteSpace(selectedOption.NewPopularityLevel))
            {
                user.Popularity = selectedOption.NewPopularityLevel;
            }

            user.Listeners += selectedOption.ListenersModifier;
            

            // Update User
            var result = await _userManager.UpdateAsync(user);

            if (!result.Succeeded)
            {
                return BadRequest(new
                {
                    errors = result.Errors.Select(error =>
                        error.Description)
                });
            }

            return Ok(new
            {
                message = "Event option accepted.",
                eventId,
                eventOptionId = selectedOption.Id,
                outcome = selectedOption.Outcome,
                status = user.Status
            });
        }

        // PUT: api/Events/#
        // Modify existing Event and Option(s)
        [Authorize(Roles = AppRoles.Moderator + "," + AppRoles.Admin)]
        [HttpPut("{id:int}")]
        public async Task<IActionResult> PutEvent(int id, UpdateEventDto request)
        {
            var existingEvent = await _context.Events
                .Include(e => e.Options)
                .FirstOrDefaultAsync(e => e.Id == id);

            if (existingEvent == null)
            {
                return NotFound();
            }

            // Update the parent Event fields
            existingEvent.Name = request.Name;
            existingEvent.Category = request.Category;
            existingEvent.Description = request.Description;

            var requestedExistingIds = request.Options
                .Where(option => option.Id > 0)
                .Select(option => option.Id)
                .ToHashSet();

            // Ensure every option Id belongs to this event
            var invalidOptionId = requestedExistingIds
                .FirstOrDefault(invalidOptionId =>
                    existingEvent.Options.All(option => option.Id != invalidOptionId));

            if (invalidOptionId != 0) {
                return BadRequest($"Option {invalidOptionId} does not belong to event {id}.");
            }

            // Remove options that were omitted from the PUT request.
            var optionsToDelete = existingEvent.Options
                .Where(option => !requestedExistingIds.Contains(option.Id))
                .ToList();

            _context.EventOptions.RemoveRange(optionsToDelete);

            foreach (var requestedOption in request.Options)
            {
                if (requestedOption.Id > 0)
                {
                    //Update an existing option
                    var existingOption = existingEvent.Options
                        .First(option => option.Id == requestedOption.Id);

                    existingOption.Text = requestedOption.Text;
                    existingOption.Outcome = requestedOption.Outcome;
                    existingOption.MembersModifier = requestedOption.MembersModifier;
                    existingOption.NewJob = requestedOption.NewJob;
                    existingOption.JobIncomeModifier = requestedOption.JobIncomeModifier;
                    existingOption.BandIncomeModifier = requestedOption.BandIncomeModifier;
                    existingOption.NewPopularityLevel = requestedOption.NewPopularityLevel;
                    existingOption.ListenersModifier = requestedOption.ListenersModifier;
                } else {
                    // Add a new option.
                    existingEvent.Options.Add(new EventOption
                    {
                        Text = requestedOption.Text,
                        Outcome = requestedOption.Outcome,
                        MembersModifier = requestedOption.MembersModifier,
                        NewJob = requestedOption.NewJob,
                        JobIncomeModifier = requestedOption.JobIncomeModifier,
                        BandIncomeModifier = requestedOption.BandIncomeModifier,
                        NewPopularityLevel = requestedOption.NewPopularityLevel,
                        ListenersModifier = requestedOption.ListenersModifier
                    });
                }
            }
            await _context.SaveChangesAsync();
            return NoContent();
        }

        // PUT: api/Events/event/#
        // Modify existing Event
        [Authorize(Roles = AppRoles.Moderator + "," + AppRoles.Admin)]
        [HttpPut("event/{id:int}")]
        public async Task<IActionResult> PutEventOnly(int id, UpdateEventDto request)
        {
            var existingEvent = await _context.Events
                .FirstOrDefaultAsync(e => e.Id == id);

            if (existingEvent == null)
            {
                return NotFound();
            }

            //Update an existing Event
            existingEvent.Name = request.Name;
            existingEvent.Category = request.Category;
            existingEvent.Description = request.Description;


            await _context.SaveChangesAsync();
            return NoContent();
        }

        // PUT: api/Events/option/#
        // Modify existing Option
        [Authorize(Roles = AppRoles.Moderator + "," + AppRoles.Admin)]
        [HttpPut("option/{id:int}")]
        public async Task<IActionResult> PutOption(int id, UpdateEventOptionDto request)
        {
            var existingOption = await _context.EventOptions
                .FirstOrDefaultAsync(o => o.Id == id);

            if (existingOption == null)
            {
                return NotFound();
            }

            //Update an existing Option
            existingOption.Text = request.Text;
            existingOption.Outcome = request.Outcome;
            existingOption.MembersModifier = request.MembersModifier;
            existingOption.NewJob = request.NewJob;
            existingOption.JobIncomeModifier = request.JobIncomeModifier;
            existingOption.BandIncomeModifier = request.BandIncomeModifier;
            existingOption.NewPopularityLevel = request.NewPopularityLevel;
            existingOption.ListenersModifier = request.ListenersModifier;


            await _context.SaveChangesAsync();
            return NoContent();
        }

        // DELETE: api/Events/#
        [Authorize(Roles = AppRoles.Admin)]
        [HttpDelete("{id:int}")]
        public async Task<IActionResult> DeleteEvent(int id)
        {
            var eventItem = await _context.Events.FindAsync(id);

            if (eventItem == null)
            {
                return NotFound();
            }

            _context.Events.Remove(eventItem);
            await _context.SaveChangesAsync();

            return NoContent();
        }


    }
}
