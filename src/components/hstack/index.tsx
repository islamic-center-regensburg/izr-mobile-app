import { useRTL } from "@/src/hooks/use-rtl";
import type { VariantProps } from "@gluestack-ui/utils/nativewind-utils";
import React from "react";
import type { ViewProps } from "react-native";
import { View } from "react-native";
import { hstackStyle } from "./styles";

type IHStackProps = ViewProps & VariantProps<typeof hstackStyle>;

const HStack = React.forwardRef<React.ComponentRef<typeof View>, IHStackProps>(
  function HStack({ className, space, reversed, ...props }, ref) {
    const { rtlClass } = useRTL();
    return (
      <View
        className={hstackStyle({
          space,
          reversed: reversed as boolean,
          class: `${rtlClass} ${className}`,
        })}
        {...props}
        ref={ref}
      />
    );
  },
);

HStack.displayName = "HStack";

export { HStack };
