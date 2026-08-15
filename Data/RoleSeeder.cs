using BandLife.Authorization;
using Microsoft.AspNetCore.Identity;

namespace BandLife.Data;

public static class RoleSeeder
{
    public static async Task SeedRolesAsync(IServiceProvider services)
    {
        using IServiceScope scope = services.CreateScope();

        RoleManager<IdentityRole> roleManager =
            scope.ServiceProvider.GetRequiredService<RoleManager<IdentityRole>>();

        foreach (string roleName in AppRoles.All)
        {
            if (await roleManager.RoleExistsAsync(roleName))
            {
                continue;
            }

            IdentityResult result = await roleManager.CreateAsync(new IdentityRole(roleName));

            if (!result.Succeeded)
            {
                string errors = string.Join(
                    ", ",
                    result.Errors.Select(error => error.Description));

                throw new InvalidOperationException(
                    $"Could not create role '{roleName}': " +
                    errors);
            }
        }
    }
}