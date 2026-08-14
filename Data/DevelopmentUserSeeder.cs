using BandLife.Authorization;
using BandLife.Models.Domain;
using Microsoft.AspNetCore.Identity;

namespace BandLife.Data
{
    public static class DevelopmentUserSeeder
    {
        // Temporary bootstrap tool to assign the Admin role to a user during development. This should be removed in production.
        public static async Task AssignAdminRoleAsync(IServiceProvider services, string email)
        {
            using IServiceScope scope = services.CreateScope();

            UserManager<ApplicationUser> userManager = scope.ServiceProvider.GetRequiredService<UserManager<ApplicationUser>>();

            ApplicationUser? user = await userManager.FindByEmailAsync(email);

            if (user is null)
            {
                return;
            }

            if (await userManager.IsInRoleAsync(user, AppRoles.Admin))
            {
                return;
            }

            IdentityResult result = await userManager.AddToRoleAsync(user, AppRoles.Admin);

            if (!result.Succeeded)
            {
                string errors = string.Join(
                    ", ", 
                    result.Errors.Select(error => error.Description));

                throw new InvalidOperationException(
                    $"Could not assign the Admin role: {errors}");
            }

            // Remove the default User role so the account has only one role
            if (await userManager.IsInRoleAsync(user, AppRoles.User))
            {
                await userManager.RemoveFromRoleAsync(user, AppRoles.User);
            }
        }
    }
}
