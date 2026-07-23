import { SizeKey, useRTL } from "@/src/hooks/use-rtl";
import { H1, H2, H3, H4, H5, H6 } from "@expo/html-elements";
import { cn, type VariantProps } from "@gluestack-ui/utils/nativewind-utils";
import { cssInterop } from "nativewind";
import React, { forwardRef } from "react";
import { Text as RNText } from "react-native";
import { headingStyle } from "./styles";

type IHeadingProps = VariantProps<typeof headingStyle> &
  React.ComponentPropsWithoutRef<typeof H1> & {
    as?: React.ElementType;
  };

cssInterop(H1, { className: "style" });
cssInterop(H2, { className: "style" });
cssInterop(H3, { className: "style" });
cssInterop(H4, { className: "style" });
cssInterop(H5, { className: "style" });
cssInterop(H6, { className: "style" });

const Heading = forwardRef<React.ComponentRef<typeof RNText>, IHeadingProps>(
  function Heading({ className, size = "lg", style, ...props }, ref) {
    const { getTextStyle, isRTL } = useRTL();

    return (
      <RNText
        ref={ref}
        className={headingStyle({
          size,
          class: cn(isRTL ? "text-right" : "text-left", className),
        })}
        style={[
          getTextStyle(size as SizeKey),
          {
            fontWeight: "normal",
          },
        ]}
        {...props}
      />
    );
  },
);
Heading.displayName = "Heading";

export { Heading };
