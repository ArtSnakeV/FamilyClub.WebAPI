namespace FamilyClub.WebAPI.Middlewares;

public class GlobalExceptionMiddleware
{
    private readonly RequestDelegate _next;
    private readonly ILogger<GlobalExceptionMiddleware> _logger;

    public GlobalExceptionMiddleware(RequestDelegate next, ILogger<GlobalExceptionMiddleware> logger)
    {
        _next = next;
        _logger = logger;
    }

    public async Task Invoke(HttpContext context)
    {
        try
        {
            await _next(context);
        }
        catch (OperationCanceledException) when (context.RequestAborted.IsCancellationRequested)
        {
            // Client closed connection. Do not write to response socket.
            _logger.LogInformation("Request {Method} {Path} was canceled by client.", context.Request.Method, context.Request.Path);
        }
        catch (Exception ex)
        {
            if (context.RequestAborted.IsCancellationRequested || IsCancellation(ex))
            {
                _logger.LogInformation("Request {Method} {Path} was canceled by client during execution.", context.Request.Method, context.Request.Path);
                return;
            }

            _logger.LogError(ex, "An unhandled exception occurred processing request: {Method} {Path}", context.Request.Method, context.Request.Path);
            if (!context.Response.HasStarted)
            {
                context.Response.StatusCode = StatusCodes.Status500InternalServerError;
                await context.Response.WriteAsJsonAsync(new { error = "An internal server error occurred." });
            }
        }
    }

    private static bool IsCancellation(Exception ex)
    {
        return ex is OperationCanceledException || ex.InnerException is OperationCanceledException;
    }
}
