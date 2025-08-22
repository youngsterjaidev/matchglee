export const FontFamily = {
  extraLight: "PJSans-ExtraLight",
  light: "PJSans-Light",
  regular: "PJSans-Regular",
  medium: "PJSans-Medium",
  semiBold: "PJSans-SemiBold",
  bold: "PJSans-Bold",
  extraBold: "PJSans-ExtraBold",
};

// Helper function to get font family by weight
export const getFontByWeight = (weight: string | number) => {
  const weightStr = String(weight);
  switch (weightStr) {
    case "200":
      return FontFamily.extraLight;
    case "300":
      return FontFamily.light;
    case "400":
    case "normal":
      return FontFamily.regular;
    case "500":
      return FontFamily.medium;
    case "600":
      return FontFamily.semiBold;
    case "700":
    case "bold":
      return FontFamily.bold;
    case "800":
      return FontFamily.extraBold;
    default:
      return FontFamily.regular;
  }
};
