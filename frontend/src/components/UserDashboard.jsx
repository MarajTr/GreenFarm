import React from 'react';
import {
  Box,
  Typography,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Tabs,
  Tab
} from '@mui/material';

const UserDashboard = () => {
  const [activeTab, setActiveTab] = React.useState(0);

  const rentalHistory = [
    {
      id: 1,
      equipment: 'Modern Tractor',
      startDate: '2024-05-01',
      endDate: '2024-05-03',
      status: 'Completed',
      totalAmount: '৳3000'
    },
    // Add more rental history items
  ];

  return (
    <Box className="p-4">
      <Typography variant="h5" className="mb-4">
        My Dashboard
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Paper className="p-4">
            <Typography variant="h6" className="mb-3">
              Quick Stats
            </Typography>
            <Box className="space-y-2">
              <Typography>Total Rentals: 5</Typography>
              <Typography>Active Rentals: 1</Typography>
              <Typography>Total Spent: ৳15,000</Typography>
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} md={8}>
          <Paper className="p-4">
            <Tabs value={activeTab} onChange={(e, v) => setActiveTab(v)}>
              <Tab label="Rental History" />
              <Tab label="Active Rentals" />
            </Tabs>

            <Box className="mt-4">
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Equipment</TableCell>
                    <TableCell>Start Date</TableCell>
                    <TableCell>End Date</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Amount</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rentalHistory.map((rental) => (
                    <TableRow key={rental.id}>
                      <TableCell>{rental.equipment}</TableCell>
                      <TableCell>{rental.startDate}</TableCell>
                      <TableCell>{rental.endDate}</TableCell>
                      <TableCell>{rental.status}</TableCell>
                      <TableCell>{rental.totalAmount}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default UserDashboard;