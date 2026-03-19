import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Building2,
  MapPin,
  BedDouble,
  Plus,
  ArrowRight,
  Settings,
} from 'lucide-react';
import AuthRouteLoader from '@/components/auth/AuthRouteLoader';
import PropertyPageState from '@/components/property/PropertyPageState';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { getApiErrorMessage } from '@/lib/get-api-error-message';
import { useGetMyPropertiesQuery } from '@/redux/services/property/property.api';
import type { PropertyApiEntity } from '@/types/responses/property/property.responses';

export default function PropertiesListPage() {
  const navigate = useNavigate();
  const {
    data: propertiesResponse,
    isLoading,
    isFetching,
    isError,
    error,
    refetch,
  } = useGetMyPropertiesQuery();
  const properties = propertiesResponse?.data ?? [];

  if (isLoading) {
    return <AuthRouteLoader message="Loading your properties..." />;
  }

  if (isError) {
    return (
      <PropertyPageState
        variant="error"
        title="Unable to load properties"
        description={getApiErrorMessage(
          error,
          'We could not fetch your properties right now. Please try again.',
        )}
        actionLabel="Try Again"
        onAction={refetch}
      />
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <section className="overflow-hidden rounded-2xl border border-border/70 bg-gradient-to-br from-primary via-primary/90 to-primary/80 text-primary-foreground shadow-sm">
        <div className="flex flex-wrap items-start justify-between gap-4 px-6 py-6 lg:px-8">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary-foreground/15 bg-primary-foreground/10 px-3 py-1 text-xs font-medium text-primary-foreground/80">
              <Building2 className="h-3 w-3" />
              Properties
            </div>
            <h1 className="text-2xl font-semibold tracking-tight lg:text-3xl">
              Your Properties
            </h1>
            <p className="max-w-lg text-sm text-primary-foreground/70">
              Manage your PG properties, configure rooms, beds, and pricing.
            </p>
          </div>
          <Button
            onClick={() => navigate('/owner/properties/add')}
            className="h-11 gap-2 rounded-xl bg-primary-foreground px-5 text-primary hover:bg-primary-foreground/90 shadow-lg"
          >
            <Plus className="h-4 w-4" /> Add Property
          </Button>
        </div>
      </section>
      {isFetching ? (
        <p className="text-sm text-muted-foreground">
          Refreshing properties...
        </p>
      ) : null}

      {/* Properties Grid */}
      {properties.length === 0 ? (
        <PropertyPageState
          title="No properties yet"
          description="Add your first PG property to start managing rooms and tenants."
          actionLabel="Add Your First Property"
          onAction={() => navigate('/owner/properties/add')}
        />
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {properties.map((property: PropertyApiEntity, idx: number) => {
            const occupancyPercent =
              property.totalBeds > 0
                ? Math.round(
                    ((property.occupiedBeds ?? 0) / property.totalBeds) * 100,
                  )
                : 0;

            return (
              <motion.div
                key={property._id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.08 }}
                className="group overflow-hidden rounded-2xl border border-border/70 bg-card shadow-sm transition-all hover:shadow-md hover:border-primary/30"
              >
                {/* Color accent bar */}
                <div className="h-1.5 bg-gradient-to-r from-primary to-primary/50" />

                <div className="p-5 space-y-4">
                  {/* Name & Location */}
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">
                      {property.name}
                    </h3>
                    <div className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground">
                      <MapPin className="h-3.5 w-3.5 shrink-0" />
                      <span className="truncate">
                        {property.address.city}, {property.address.state}
                      </span>
                    </div>
                    {property.description && (
                      <p className="mt-2 text-xs text-muted-foreground line-clamp-2">
                        {property.description}
                      </p>
                    )}
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-3">
                    <div className="rounded-xl bg-muted/40 px-3 py-2.5 text-center">
                      <p className="text-lg font-bold text-foreground">
                        {property.totalRooms}
                      </p>
                      <p className="text-[10px] text-muted-foreground">Rooms</p>
                    </div>
                    <div className="rounded-xl bg-muted/40 px-3 py-2.5 text-center">
                      <p className="text-lg font-bold text-foreground">
                        {property.totalBeds}
                      </p>
                      <p className="text-[10px] text-muted-foreground">Beds</p>
                    </div>
                    <div className="rounded-xl bg-muted/40 px-3 py-2.5 text-center">
                      <p className="text-lg font-bold text-foreground">
                        {occupancyPercent}%
                      </p>
                      <p className="text-[10px] text-muted-foreground">
                        Occupied
                      </p>
                    </div>
                  </div>

                  {/* Occupancy bar */}
                  <div>
                    <div className="flex items-center justify-between text-xs mb-1.5">
                      <span className="text-muted-foreground">Occupancy</span>
                      <Badge
                        variant="secondary"
                        className={`text-[10px] ${
                          occupancyPercent >= 80
                            ? 'bg-emerald-100 text-emerald-700'
                            : occupancyPercent >= 50
                              ? 'bg-amber-100 text-amber-700'
                              : 'bg-red-100 text-red-600'
                        }`}
                      >
                        {property.occupiedBeds ?? 0}/{property.totalBeds} beds
                      </Badge>
                    </div>
                    <div className="h-2 rounded-full bg-muted">
                      <div
                        className="h-2 rounded-full bg-primary transition-all"
                        style={{ width: `${occupancyPercent}%` }}
                      />
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 pt-1">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 gap-1.5 rounded-xl text-xs"
                      onClick={() =>
                        navigate(`/owner/properties/${property._id}/details`)
                      }
                    >
                      <BedDouble className="h-3.5 w-3.5" />
                      View Rooms
                      <ArrowRight className="h-3 w-3" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      className="rounded-xl"
                      onClick={() =>
                        navigate(`/owner/properties/${property._id}/details`)
                      }
                    >
                      <Settings className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
}
