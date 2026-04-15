'use client';

import * as React from 'react';
import { Accordion as AccordionPrimitive } from 'radix-ui';
import { motion, type HTMLMotionProps } from 'motion/react';

import { useControlledState } from '@/hooks/use-controlled-state';
import { getStrictContext } from '@/lib/get-strict-context';

type AccordionContextType = {
  value: string | string[] | undefined;
  setValue: (value: string | string[] | undefined) => void;
};

type AccordionItemContextType = {
  value: string;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
};

const [AccordionProvider, useAccordion] =
  getStrictContext<AccordionContextType>('AccordionContext');

const [AccordionItemProvider, useAccordionItem] =
  getStrictContext<AccordionItemContextType>('AccordionItemContext');

type AccordionProps = React.ComponentProps<typeof AccordionPrimitive.Root>;

function Accordion(props: AccordionProps) {
  const [value, setValue] = useControlledState<string | string[] | undefined>({
    value: props?.value,
    defaultValue: props?.defaultValue,
    onChange: props?.onValueChange as (
      value: string | string[] | undefined,
    ) => void,
  });

  return (
    <AccordionProvider value={{ value, setValue }}>
      <AccordionPrimitive.Root
        data-slot="accordion"
        {...props}
        onValueChange={setValue}
      />
    </AccordionProvider>
  );
}

type AccordionItemProps = React.ComponentProps<typeof AccordionPrimitive.Item>;

function itemMatchesValue(
  root: string | string[] | undefined,
  itemValue: string,
): boolean {
  if (root === undefined) return false;
  if (typeof root === 'string') return root === itemValue;
  return root.includes(itemValue);
}

function AccordionItem(props: AccordionItemProps) {
  const { value } = useAccordion();
  const [isOpen, setIsOpen] = React.useState(() =>
    itemMatchesValue(value, props.value),
  );

  React.useEffect(() => {
    setIsOpen(itemMatchesValue(value, props.value));
  }, [value, props.value]);

  return (
    <AccordionItemProvider value={{ isOpen, setIsOpen, value: props.value }}>
      <AccordionPrimitive.Item data-slot="accordion-item" {...props} />
    </AccordionItemProvider>
  );
}

type AccordionHeaderProps = React.ComponentProps<
  typeof AccordionPrimitive.Header
>;

function AccordionHeader(props: AccordionHeaderProps) {
  return <AccordionPrimitive.Header data-slot="accordion-header" {...props} />;
}

type AccordionTriggerProps = React.ComponentProps<
  typeof AccordionPrimitive.Trigger
>;

function AccordionTrigger(props: AccordionTriggerProps) {
  return (
    <AccordionPrimitive.Trigger data-slot="accordion-trigger" {...props} />
  );
}

type AccordionContentProps = Omit<
  React.ComponentProps<typeof AccordionPrimitive.Content>,
  'asChild' | 'forceMount'
> &
  HTMLMotionProps<'div'> & {
    keepRendered?: boolean;
  };

function AccordionContent({
  keepRendered: _keepRendered = false,
  transition = { duration: 0.35, ease: 'easeInOut' },
  className,
  children,
  ...props
}: AccordionContentProps) {
  const { isOpen } = useAccordionItem();

  return (
    <AccordionPrimitive.Content forceMount asChild>
      <motion.div
        data-slot="accordion-content"
        initial={{ height: 0, opacity: 0, y: 12 }}
        animate={
          isOpen
            ? { height: 'auto', opacity: 1, y: 0 }
            : { height: 0, opacity: 0, y: 12 }
        }
        transition={transition}
        style={{ overflow: 'hidden' }}
        className={className}
        {...props}
      >
        {children}
      </motion.div>
    </AccordionPrimitive.Content>
  );
}

export {
  Accordion,
  AccordionItem,
  AccordionHeader,
  AccordionTrigger,
  AccordionContent,
  useAccordion,
  useAccordionItem,
  type AccordionProps,
  type AccordionItemProps,
  type AccordionHeaderProps,
  type AccordionTriggerProps,
  type AccordionContentProps,
  type AccordionContextType,
  type AccordionItemContextType,
};
