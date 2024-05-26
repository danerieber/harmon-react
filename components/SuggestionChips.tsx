import { Chip } from "@nextui-org/chip";
import clsx from "clsx";

interface SuggestionChipsProps<T> {
  items: T[];
  onChipClick: (item: T) => void;
  getItemKey: (item: T) => string;
  getItemLabel: (item: T) => string;
  getItemIcon?: (item: T) => React.ReactNode;
  getItemClassNames?: (item: T) => string;
}

const SuggestionChips = <T,>({
  items,
  onChipClick,
  getItemKey,
  getItemLabel,
  getItemIcon,
  getItemClassNames,
}: SuggestionChipsProps<T>) => {
  return (
    <div className="flex flex-wrap gap-2 mb-2">
      {items.map((item) => (
        <Chip
          classNames={{
            base: clsx("hover:cursor-pointer", getItemClassNames?.(item)),
            content: "font-bold",
          }}
          variant="faded"
          onClick={() => onChipClick(item)}
          key={getItemKey(item)}
          startContent={<div className="pl-1">{getItemIcon?.(item)}</div>}
        >
          {getItemLabel(item)}
        </Chip>
      ))}
    </div>
  );
};

export default SuggestionChips;
