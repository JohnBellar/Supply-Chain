import React from 'react';
import { Grid, Card, CardContent, Typography, Box, useTheme } from '@mui/material';
import { Link } from 'react-router-dom';
import { products } from '../data/productsData';

function Products() {
  const theme = useTheme();

  const cardStyle = {
    background: 'linear-gradient(145deg, #1a2027 0%, #121212 100%)',
    boxShadow: '0 8px 16px rgba(0,0,0,0.4)',
    borderRadius: '12px',
    height: '100%',
    transition: 'transform 0.3s ease-in-out',
    '&:hover': {
      transform: 'scale(1.02)',
    },
  };

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Typography variant="h4" gutterBottom sx={{ color: theme.palette.primary.light }}>
        Product Categories
      </Typography>
      <Grid container spacing={3}>
        {products.map((product) => (
          <Grid item xs={12} sm={6} md={4} key={product.id}>
            <Link to={`/products/${product.id}`} style={{ textDecoration: 'none' }}>
              <Card sx={cardStyle}>
                <CardContent>
                  <Typography variant="h6" gutterBottom sx={{ color: theme.palette.primary.light }}>
                    {product.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Monitored Parameters:
                  </Typography>
                  <Box sx={{ mt: 1 }}>
                    {Object.entries(product.parameters).map(([param, data]) => (
                      <Typography
                        key={param}
                        variant="body2"
                        sx={{
                          display: 'inline-block',
                          bgcolor: theme.palette.primary.dark,
                          color: theme.palette.primary.light,
                          px: 1,
                          py: 0.5,
                          borderRadius: 1,
                          mr: 1,
                          mb: 1,
                        }}
                      >
                        {param === 'location' ? `${param}: ${data.desc}` : `${param}: ${data.value}${data.unit}`}
                      </Typography>
                    ))}
                  </Box>
                </CardContent>
              </Card>
            </Link>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default Products;
