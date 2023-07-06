import { Card, Typography, CardContent } from '@mui/material';

export const NeoCard = ({ neo }) => {
  console.log(neo);

  const neoInfo = neo[1].reduce((acc, currentNeo) => {
    const max_diameter = currentNeo.estimated_diameter.kilometers.estimated_diameter_max
    const distance = currentNeo.close_approach_data[0].miss_distance.kilometers
    const speed = currentNeo.close_approach_data[0].relative_velocity.kilometers_per_hour

    if (acc.max_estimated_diameter < max_diameter) {
      acc.max_estimated_diameter = max_diameter;
    }

    if (neo.is_potentially_hazardous_asteroid) {
      acc.number_of_potentially_hazardous++;
    }

    if (acc.closest_NEO === null) {
      acc.closest_NEO = distance;
    }
    
    if (acc.closest_NEO > distance) {
      acc.closest_NEO = distance;
    }
  
    if (acc.fastest_NEO === null) {
      acc.fastest_NEO = speed;
    }

    if (acc.fastest_NEO > speed) {
      acc.fastest_NEO = speed
    }
    
    return acc
  }, {
      max_estimated_diameter: 0,
      number_of_potentially_hazardous: 0,
      closest_NEO: null,
      fastest_NEO: null
  })

console.log(neoInfo);

  return (
    <Card sx={{ minWidth: 200 }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          NEO CARD
        </Typography>
        <Typography variant="h5" component="div">
          {neo[0]}
        </Typography>

        <Typography variant="body2" sx={{ mb: 1.5 }}>
          {`Max estimated diameter: ${neoInfo.max_estimated_diameter.toFixed(3)}km`}
        </Typography>
        
        <Typography variant="body2" sx={{ mb: 1.5 }}>
          {`Potentially hazardous per day: ${neoInfo.number_of_potentially_hazardous}`}
        </Typography>

        <Typography variant="body2" sx={{ mb: 1.5 }}>
          {`Closest NEO: ${neoInfo.closest_NEO}km`}
        </Typography>

        <Typography variant="body2">
          {`Fastest NEO: ${neoInfo.fastest_NEO}kph`}
        </Typography>
      </CardContent>
    </Card>
  )
}