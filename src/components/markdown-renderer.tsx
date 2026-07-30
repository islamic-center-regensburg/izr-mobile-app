import { Heading } from "@/src/components/heading";
import { Text } from "@/src/components/text";
import { VStack } from "@/src/components/vstack";
import Markdown from "react-native-markdown-display";
import { useRTL } from "../hooks/use-rtl";

interface MarkdownRendererProps {
  content?: string;
  className?: string;
}

const MarkdownRenderer = ({ content = "", className }: MarkdownRendererProps) => {
  const { textAlign } = useRTL();
  const resolvedTextAlign = textAlign === "right" ? "right" : "left";

  const rules = {
    heading1: (node: any, children: any) => (
      <Heading key={node.key} size="2xl" className={`mb-2 text-${resolvedTextAlign}`}>
        {children}
      </Heading>
    ),
    heading2: (node: any, children: any) => (
      <Heading key={node.key} size="xl" className={`mb-2 text-${resolvedTextAlign}`}>
        {children}
      </Heading>
    ),
    heading3: (node: any, children: any) => (
      <Heading key={node.key} size="lg" className={`mb-1 text-${resolvedTextAlign}`}>
        {children}
      </Heading>
    ),
    paragraph: (node: any, children: any) => (
      <Text
        key={node.key}
        className={`my-1 text-${resolvedTextAlign}`}
      >
        {children}
      </Text>
    ),
    strong: (node: any, children: any) => (
      <Text key={node.key} bold>
        {children}
      </Text>
    ),
    em: (node: any, children: any) => (
      <Text key={node.key} italic>
        {children}
      </Text>
    ),
    text: (node: any) => (
      <Text key={node.key}>{node.content}</Text>
    ),
    link: (node: any, children: any, parent: any, styles: any) => (
      <Text key={node.key} className="underline text-blue-400">
        {children}
      </Text>
    ),
    list_item: (node: any, children: any) => (
      <Text key={node.key} className="my-0.5">
        • {children}
      </Text>
    ),
    code_inline: (node: any) => (
      <Text
        key={node.key}
        className="bg-white/15 rounded-md px-1.5 py-0.5"
      >
        {node.content}
      </Text>
    ),
  };

  return (
    <VStack className={className}>
      <Markdown rules={rules}>{content}</Markdown>
    </VStack>
  );
};

export default MarkdownRenderer;