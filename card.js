// components/CardComponent.js
import React from 'react';
import { Card, CardContent, Button } from '@mui/material';

const CardComponent = ({ title, icon, buttonLabel }) => (
  <Card className="bg-white rounded-3xl shadow-xl hover:shadow-2xl p-6">
    <CardContent>
      <h2 className="text-2xl font-bold mb-5 text-blue-700 flex items-center gap-2">
        {icon} {title}
      </h2>
      <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-xl">
        {buttonLabel}
      </Button>
    </CardContent>
  </Card>
);

export default CardComponent;
