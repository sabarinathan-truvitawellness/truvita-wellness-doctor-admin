import React, { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import Slider from '@mui/material/Slider';

interface PriceRangeProps {
  minPrice: number;
  maxPrice: number;
  step?: number;
  onPriceChange?: (values: number[], name: string) => void;
  label?: string;
  name?: string;
}

const MinMaxPricing: React.FC<PriceRangeProps> = ({
  minPrice,
  maxPrice,
  step = 1,
  onPriceChange,
  label = "",
  name = ""
}) => {
  const [priceRange, setPriceRange] = useState<number[]>([minPrice, maxPrice]);

  // Synchronize priceRange with parent props when they change
  useEffect(() => {
    setPriceRange([minPrice, maxPrice]);
  }, [minPrice, maxPrice]);

  const handleSliderChange = (_event: Event, newValue: number | number[]) => {
    const newRange = newValue as number[];
    setPriceRange(newRange); // Update local state
    if (onPriceChange) {
      onPriceChange(newRange, name); // Call parent handler
    }
  };

  return (
    <Box sx={{ width: 400, padding: 2 }}>
      <Typography variant="h6" gutterBottom>
        {label}
      </Typography>
      <Box display="flex" justifyContent="space-between">
        <Typography>${priceRange[0]}</Typography>
        <Typography>${priceRange[1]}</Typography>
      </Box>
      <Slider
        value={priceRange}
        onChange={handleSliderChange}
        valueLabelDisplay="auto"
        aria-labelledby="price-range-slider"
        min={minPrice}
        max={maxPrice}
        step={step}
      />
    </Box>
  );
};

export default MinMaxPricing;
