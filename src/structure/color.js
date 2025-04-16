const color = {
    // Default Embed Color
    DEFAULT: "#37373d",  // A soft Discord gray-blurple

    // Standard Colors for Discord
    BLURPLE: "#5865F2",  // Discord Blurple
    SUCCESS: "#57F287",  // Success Green
    WARNING: "#FAA61A",  // Warning Yellow
    DANGER: "#ED4245",   // Error Red
    INFO: "#43B581",     // Informational (a slightly different green)

    // Additional Custom Colors
    AQUA: "#1ABC9C",     // Vibrant Aqua
    PURPLE: "#9B59B6",   // Rich Purple
    ORANGE: "#E67E22",   // Vivid Orange
    GREY: "#95A5A6",     // Neutral Grey
    DARK: "#2C2F33",     // Dark background shade
    LIGHT: "#99AAB5",    // Light grey for subtle accents

    // Extra Colors
    MAGENTA: "#FF00FF",  // Vibrant Magenta
    CYAN: "#00FFFF",     // Bright Cyan
    LIME: "#32CD32",     // Lime Green
    GOLD: "#FFD700",     // Gold
    NAVY: "#000080",     // Navy Blue
    MAROON: "#800000",   // Deep Maroon
    BLACK: "#000000",    // Black
    WHITE: "#FFFFFF",    // White
    PINK: "#FFC0CB",     // Soft Pink
    TEAL: "#008080",     // Teal
    SLATE: "#708090",    // Slate Gray

    // Random Color Generator
    RANDOM: function () {
        return "#" + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
    }
};

module.exports = color;
