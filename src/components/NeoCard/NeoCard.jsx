import { Card, Typography, CardContent } from '@mui/material';

export const NeoCard = ({ day, days }) => {
  const {
    max_estimated_diameter,
    number_of_potentially_hazardous,
    closest_NEO,
    fastest_NEO,
  } = day;
  const isHazardous = [...days]
    .sort((prevDay, nextDay) => nextDay.number_of_potentially_hazardous - prevDay.number_of_potentially_hazardous)
    .slice(0, 2)
    .some( currentDay => currentDay.date === day.date);

  return (
    <Card sx={{ minWidth: 200, backgroundColor: isHazardous && "red" }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          NEO CARD
        </Typography>
        <Typography variant="h5" component="div">
          {day.date}
        </Typography>

        <Typography variant="body2" sx={{ mb: 1.5 }}>
          {`Max estimated diameter: ${max_estimated_diameter.toFixed(3)}km`}
        </Typography>
        
        <Typography variant="body2" sx={{ mb: 1.5 }}>
          {`Potentially hazardous per day: ${number_of_potentially_hazardous}`}
        </Typography>

        <Typography variant="body2" sx={{ mb: 1.5 }}>
          {`Closest NEO: ${parseFloat(closest_NEO).toFixed(3)}km`}
        </Typography>

        <Typography variant="body2">
          {`Fastest NEO: ${parseFloat(fastest_NEO).toFixed(3)}kph`}
        </Typography>
      </CardContent>
    </Card>
  )
}