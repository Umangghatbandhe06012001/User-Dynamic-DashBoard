import React, { useState } from 'react';

interface AnalyticsFiltersProps {
  onFilterChange: (filters: { dateRange: { start: string, end: string }, region: string }) => void;
}

const AnalyticsFilters: React.FC<AnalyticsFiltersProps> = ({ onFilterChange }) => {
  const [selectedRegion, setSelectedRegion] = useState<string>('All');
  const [selectedDateRange, setSelectedDateRange] = useState<{ start: string, end: string }>({
    start: '',
    end: '',
  });

  const handleRegionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newRegion = event.target.value;
    setSelectedRegion(newRegion);
    onFilterChange({ region: newRegion, dateRange: selectedDateRange });
  };

  const handleDateRangeChange = (start: string, end: string) => {
    setSelectedDateRange({ start, end });
    onFilterChange({ region: selectedRegion, dateRange: { start, end } });
  };

  return (
    <div>
      {/* Region filter */}
      <select onChange={handleRegionChange}>
        <option value="All">All Regions</option>
        <option value="North America">North America</option>
        <option value="Europe">Europe</option>
        <option value="Asia">Asia</option>
        <option value="South America">South America</option>
      </select>

      {/* Date Range filter */}
      <div>
        <input
          type="date"
          value={selectedDateRange.start}
          onChange={(e) => handleDateRangeChange(e.target.value, selectedDateRange.end)}
        />
        <input
          type="date"
          value={selectedDateRange.end}
          onChange={(e) => handleDateRangeChange(selectedDateRange.start, e.target.value)}
        />
      </div>
    </div>
  );
};

export default AnalyticsFilters;
