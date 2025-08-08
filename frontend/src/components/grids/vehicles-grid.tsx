"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { RefreshCw, Search } from "lucide-react";
import { useRouter } from "next/navigation";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { getVehicles } from "@/lib/api/vehicles";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface Vehicle {
  id: string;
  brand: string;
  model: string;
  plateNumber: string;
  manufactureYear: string;
  fuelType: string;
  status: string;
}

export default function VehiclesGrid() {
  const router = useRouter();

  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchVehicles = () => {
    setLoading(true);
    getVehicles()
      .then((res) => setVehicles(res))
      .catch((err) => toast.error(err.message, { duration: 12000 }))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchVehicles();
  }, []);

  const filteredVehicles = vehicles.filter((vehicle) =>
    [
      vehicle.brand,
      vehicle.model,
      vehicle.plateNumber,
      vehicle.fuelType,
      vehicle.status,
    ].some((field) => field?.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <>
      <div className="flex justify-between items-center gap-2 mb-8">
        <div className="flex items-center gap-2 flex-1">
          <Search className="w-5" />
          <Input
            type="text"
            placeholder="Pesquisar..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full max-w-md"
          />
          <Button variant="outline" onClick={fetchVehicles}>
            <RefreshCw className="mr-2 h-4 w-4" />
            <span>Atualizar</span>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {loading ? (
          Array(6)
            .fill(0)
            .map((_, idx) => (
              <Card
                key={idx}
                className={idx % 2 === 0 ? "bg-muted/40" : "bg-muted/0"}
              >
                <CardHeader>
                  <CardTitle>
                    <Skeleton className="h-6 w-3/4" />
                  </CardTitle>
                  <CardDescription>
                    <Skeleton className="h-4 w-full" />
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-40 w-full" />
                </CardContent>
                <CardFooter>
                  <Skeleton className="h-10 w-full" />
                </CardFooter>
              </Card>
            ))
        ) : filteredVehicles.length > 0 ? (
          filteredVehicles.map((vehicle, idx) => (
            <Card
              key={vehicle.id}
              className={
                idx % 2 === 0
                  ? "bg-muted/40 hover:bg-muted"
                  : "bg-muted/0 hover:bg-muted"
              }
            >
              <CardHeader>
                <CardTitle>{`${vehicle.brand} ${vehicle.model}`}</CardTitle>
                <CardDescription>{vehicle.plateNumber}</CardDescription>
              </CardHeader>
              <CardContent className="text-sm">
                <p>Ano de fabrico: {vehicle.manufactureYear}</p>
                <p>Combustível: {vehicle.fuelType}</p>
                <p>Status: {vehicle.status}</p>
              </CardContent>
              <CardFooter>
                <Button
                  className="w-full"
                  onClick={() => router.push(`/vehicles/${vehicle.id}`)}
                >
                  Ver detalhes
                </Button>
              </CardFooter>
            </Card>
          ))
        ) : (
          <div className="col-span-full text-center py-8">
            <p className="text-muted-foreground">Nenhum veículo encontrado</p>
          </div>
        )}
      </div>
    </>
  );
}
