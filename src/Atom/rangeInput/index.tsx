import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import Slider from '@mui/material/Slider';

interface PriceRangeProps {
  minPrice: number;
  maxPrice: number;
  step?: number;
  onPriceChange?: (values: number[]) => void;
}

const MinMaxPricing: React.FC<PriceRangeProps> = ({
  minPrice,
  maxPrice,
  step = 1,
  onPriceChange,
}) => {
  const [priceRange, setPriceRange] = useState<number[]>([minPrice, maxPrice]);

  const handleSliderChange = (event: Event, newValue: number | number[]) => {
    setPriceRange(newValue as number[]);
    if (onPriceChange) {
      onPriceChange(newValue as number[]);
    }
  };

  return (
    <Box sx={{ width: 400, padding: 2 }}>
      <Typography variant="h6" gutterBottom>
        Select Price Range
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
