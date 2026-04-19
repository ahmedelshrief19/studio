
'use client';

import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Plus, Trash2, Car as CarIcon } from 'lucide-react';

interface Car {
  id: string;
  model: string;
  price: number;
}

export function CarSystem() {
  const [cars, setCars] = useState<Car[]>([]);
  const [model, setModel] = useState('');
  const [price, setPrice] = useState('');

  const addCar = (e: React.FormEvent) => {
    e.preventDefault();
    if (!model.trim() || !price) return;

    const newCar: Car = {
      id: Math.random().toString(36).substr(2, 9),
      model: model,
      price: parseFloat(price),
    };

    setCars([...cars, newCar]);
    setModel('');
    setPrice('');
  };

  const removeCar = (id: string) => {
    setCars(cars.filter(car => car.id !== id));
  };

  return (
    <div className="flex flex-col gap-6 p-4">
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CarIcon className="h-6 w-6 text-accent" />
            Add New Car
          </CardTitle>
          <CardDescription>Based on C# Logic simulation</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={addCar} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Model Name</label>
              <Input
                placeholder="e.g. Toyota Camry"
                value={model}
                onChange={(e) => setModel(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Price ($)</label>
              <Input
                type="number"
                placeholder="e.g. 25000"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
            <Button type="submit" className="w-full">
              <Plus className="mr-2 h-4 w-4" /> Add to Fleet
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card className="w-full">
        <CardHeader>
          <CardTitle>Current Fleet</CardTitle>
          <CardDescription>Displaying all registered vehicles</CardDescription>
        </CardHeader>
        <CardContent>
          {cars.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No cars in the fleet yet. Add one above.
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Model</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {cars.map((car) => (
                  <TableRow key={car.id}>
                    <TableCell className="font-medium">{car.model}</TableCell>
                    <TableCell>${car.price.toLocaleString()}</TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeCar(car.id)}
                        className="text-destructive hover:text-destructive hover:bg-destructive/10"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
