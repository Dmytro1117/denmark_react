import { TabsContainer, Tab } from "./PageTabs.styled";

export const PagesTabs = ({
  options,
  activeValue,
  onChange,
  containerProps = {},
}) => {
  const activeOption = options.find((opt) => opt.value === activeValue);
  const activeColor = activeOption?.color || options[0].color;

  return (
    <TabsContainer $activeColor={activeColor} {...containerProps}>
      {options.map((opt) => (
        <Tab
          key={opt.value}
          type="button"
          $isActive={activeValue === opt.value}
          $activeColor={opt.color}
          onClick={() => onChange(opt.value)}
        >
          {opt.label}
        </Tab>
      ))}
    </TabsContainer>
  );
};
