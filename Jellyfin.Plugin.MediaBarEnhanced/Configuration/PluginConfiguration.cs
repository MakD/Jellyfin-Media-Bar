using MediaBrowser.Model.Plugins;

namespace Jellyfin.Plugin.MediaBarEnhanced.Configuration
{
    /// <summary>
    /// Plugin configuration.
    /// </summary>
    public class PluginConfiguration : BasePluginConfiguration
    {
        public int ShuffleInterval { get; set; } = 7000;
        public int RetryInterval { get; set; } = 500;
        public int MinSwipeDistance { get; set; } = 50;
        public int LoadingCheckInterval { get; set; } = 100;
        public int MaxPlotLength { get; set; } = 360;
        public int MaxMovies { get; set; } = 15;
        public int MaxTvShows { get; set; } = 15;
        public int MaxItems { get; set; } = 500;
        public int MaxParentalRating { get; set; } = 0;
        public int MaxDaysRecent { get; set; } = 0;
        public int PreloadCount { get; set; } = 3;
        public int FadeTransitionDuration { get; set; } = 500;
        public int MaxPaginationDots { get; set; } = 15;
        public bool ShowPaginationDots { get; set; } = true;
        public bool SlideAnimationEnabled { get; set; } = true;
        public bool EnableVideoBackdrop { get; set; } = true;
        public bool UseSponsorBlock { get; set; } = true;
        public bool PreferLocalTrailers { get; set; } = false;
        public bool RandomizeLocalTrailers { get; set; } = false;
        public bool PreferLocalBackdrops { get; set; } = false;
        public bool RandomizeThemeVideos { get; set; } = false;
        public bool WaitForTrailerToEnd { get; set; } = true;
        public bool StartMuted { get; set; } = true;
        public bool FullWidthVideo { get; set; } = true;
        public bool EnableMobileVideo { get; set; } = false;
        public bool ShowTrailerButton { get; set; } = true;
        public bool EnableLoadingScreen { get; set; } = true;
        public bool EnableKeyboardControls { get; set; } = true;
        public bool AlwaysShowArrows { get; set; } = false;
        public bool HideArrowsOnMobile { get; set; } = true;
        public string CustomMediaIds { get; set; } = "";
        public bool EnableCustomMediaIds { get; set; } = true;
        public bool EnableSeasonalContent { get; set; } = false;
        public bool ExcludeSeasonalContent { get; set; } = true;
        public string SeasonalSections { get; set; } = "[]";
        public bool IsEnabled { get; set; } = true;
        public bool EnableClientSideSettings { get; set; } = false;
        public bool ApplyLimitsToCustomIds { get; set; } = false;
        public bool IncludeWatchedContent { get; set; } = false;
        public string SortBy { get; set; } = "Random";
        public string SortOrder { get; set; } = "Ascending";
        public int BackdropVideoDelay { get; set; } = 0;
        public bool ConstrainPlotWidth { get; set; } = false;
        
        public bool EnableCustomOverlay { get; set; } = false;
        public string CustomOverlayText { get; set; } = "";
        public string CustomOverlayImageUrl { get; set; } = "";
        public string CustomOverlayStyle { get; set; } = "Shadowed";
        public string CustomOverlayImageStyle { get; set; } = "None";
        public string CustomOverlayPriority { get; set; } = "Image";
        
        public int CustomOverlayPositionX { get; set; } = 0;
        public int CustomOverlayPositionY { get; set; } = 0;
        public int CustomOverlayScale { get; set; } = 100;
    }
}
