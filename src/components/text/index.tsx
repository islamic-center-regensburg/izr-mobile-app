import React from "react";

import { SizeKey, useRTL } from "@/src/hooks/use-rtl";
import { cn, type VariantProps } from "@gluestack-ui/utils/nativewind-utils";
import { Text as RNText } from "react-native";
import { textStyle } from "./styles";

type ITextProps = React.ComponentProps<typeof RNText> &
  VariantProps<typeof textStyle>;

const Text = React.forwardRef<React.ComponentRef<typeof RNText>, ITextProps>(
  function Text(
    {
      className,
      isTruncated,
      bold,
      underline,
      strikeThrough,
      size = "md",
      sub,
      italic,
      highlight,
      style,
      ...props
    },
    ref,
  ) {
    const { getTextStyle, isRTL } = useRTL();

    return (
      <RNText
        className={textStyle({
          isTruncated: isTruncated as boolean,
          bold: bold as boolean,
          underline: underline as boolean,
          strikeThrough: strikeThrough as boolean,
          size,
          sub: sub as boolean,
          italic: italic as boolean,
          highlight: highlight as boolean,
          class: cn(isRTL ? "text-right" : "text-left", className),
        })}
        {...props}
        style={[getTextStyle(size as SizeKey), style]}
        ref={ref}
      />
    );
  },
);

Text.displayName = "Text";

export { Text };
