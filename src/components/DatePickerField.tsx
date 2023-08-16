/* eslint-disable */
import { Box, Card, DatePicker, Icon, Popover, TextField, VerticalStack } from '@shopify/polaris';
import { CalendarMinor } from '@shopify/polaris-icons';
import { useEffect, useRef, useState } from 'react';

export const DatePickerField = () => {
  const [visible, setVisible] = useState(false);

  const [selectedDate, setSelectedDate] = useState(new Date());

  const [{ month, year }, setDate] = useState({
    month: selectedDate.getMonth(),
    year: selectedDate.getFullYear()
  });

  const formattedValue = selectedDate.toISOString().slice(0, 10);

  const datePickerRef = useRef(null);

  function nodeContainsDescendant(rootNode, descendant) {
    if (rootNode === descendant) {
      return true;
    }
    let parent = descendant.parentNode;
    while (parent != null) {
      if (parent === rootNode) {
        return true;
      }
      parent = parent.parentNode;
    }
    return false;
  }

  function isNodeWithinPopover(node) {
    return datePickerRef?.current ? nodeContainsDescendant(datePickerRef.current, node) : false;
  }

  function handleInputValueChange() {
    console.log('handleInputValueChange');
  }

  function handleOnClose({ relatedTarget }) {
    setVisible(false);
  }

  function handleMonthChange(month, year) {
    setDate({ month, year });
  }

  function handleDateSelection({ end: newSelectedDate }) {
    setSelectedDate(newSelectedDate);
    setVisible(false);
  }

  useEffect(() => {
    if (selectedDate) {
      setDate({
        month: selectedDate.getMonth(),
        year: selectedDate.getFullYear()
      });
    }
  }, [selectedDate]);

  return (
    <VerticalStack inlineAlign="center" gap="4">
      <Box minWidth="276px" padding={{ xs: 2 }}>
        <Popover
          active={visible}
          autofocusTarget="none"
          preferredAlignment="left"
          fullWidth
          preferInputActivator={false}
          preferredPosition="below"
          preventCloseOnChildOverlayClick
          onClose={handleOnClose}
          activator={
            <TextField
              role="combobox"
              label="Start date"
              prefix={<Icon source={CalendarMinor} />}
              value={formattedValue}
              onFocus={() => setVisible(true)}
              onChange={handleInputValueChange}
              autoComplete="off"
            />
          }
        >
          <Card ref={datePickerRef}>
            <DatePicker
              month={month}
              year={year}
              selected={selectedDate}
              onMonthChange={handleMonthChange}
              onChange={handleDateSelection}
            />
          </Card>
        </Popover>
      </Box>
    </VerticalStack>
  );
};
