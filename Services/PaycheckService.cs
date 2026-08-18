using BandLife.Models.Domain;

namespace BandLife.Services
{
    public class PaycheckService
    {
        public bool ApplyPendingPaychecks(ApplicationUser user)
        {
            if (user.LastPaycheckAt == null || user.JobIncome <= 0)
            {
                return false;
            }

            var now = DateTimeOffset.UtcNow;
            var elapsed = now - user.LastPaycheckAt.Value;
            var completedWeeks = (int)(elapsed.TotalDays / 7);

            if (completedWeeks <= 0)
            {
                return false;
            }

            user.BankAccount += user.JobIncome * completedWeeks;

            // Advance from the previous checkpoint so leftover days are retained.
            user.LastPaycheckAt = user.LastPaycheckAt.Value.AddDays(completedWeeks * 7);

            return true;
        }
    }
}
