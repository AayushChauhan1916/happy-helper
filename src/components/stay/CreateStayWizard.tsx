import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  getUserByEmail, mockProperties, getPropertyRooms, getRoomBeds,
  mockRooms, getBedStay, getRoomStay,
} from "@/data/mock-properties";
import type { Gender } from "@/types/property.types";
import { Check, ArrowRight, ArrowLeft, Search, User, MapPin, Calendar } from "lucide-react";
import { toast } from "sonner";

interface CreateStayWizardProps {
  skipLocationStep: boolean;
  preselectedPropertyId?: string;
  preselectedRoomId?: string;
  preselectedBedId?: string;
  onComplete: () => void;
}

type Step = "find_user" | "user_details" | "location" | "stay_details";

export function CreateStayWizard({
  skipLocationStep,
  preselectedPropertyId,
  preselectedRoomId,
  preselectedBedId,
  onComplete,
}: CreateStayWizardProps) {
  const steps: Step[] = skipLocationStep
    ? ["find_user", "user_details", "stay_details"]
    : ["find_user", "user_details", "location", "stay_details"];

  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const currentStep = steps[currentStepIndex];

  // Step 1 state
  const [email, setEmail] = useState("");
  const [userFound, setUserFound] = useState<boolean | null>(null);

  // Step 2 state
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState<Gender>("male");

  // Step 3 state
  const [propertyId, setPropertyId] = useState(preselectedPropertyId || "");
  const [roomId, setRoomId] = useState(preselectedRoomId || "");
  const [bedId, setBedId] = useState(preselectedBedId || "");

  // Step 4 state
  const [startDate, setStartDate] = useState(new Date().toISOString().split("T")[0]);
  const [endDate, setEndDate] = useState("");
  const [notes, setNotes] = useState("");

  const stepLabels: Record<Step, { label: string; icon: React.ReactNode }> = {
    find_user: { label: "Find User", icon: <Search className="h-4 w-4" /> },
    user_details: { label: "Details", icon: <User className="h-4 w-4" /> },
    location: { label: "Location", icon: <MapPin className="h-4 w-4" /> },
    stay_details: { label: "Stay", icon: <Calendar className="h-4 w-4" /> },
  };

  function handleSearchUser() {
    if (!email.trim()) return;
    const user = getUserByEmail(email);
    if (user) {
      setUserFound(true);
      setFullName(user.fullName);
      setPhone(user.phone);
      setGender(user.gender);
    } else {
      setUserFound(false);
    }
  }

  function handleNext() {
    if (currentStepIndex < steps.length - 1) {
      setCurrentStepIndex((i) => i + 1);
    }
  }

  function handleBack() {
    if (currentStepIndex > 0) {
      setCurrentStepIndex((i) => i - 1);
    }
  }

  function handleSubmit() {
    toast.success("Stay created successfully!", {
      description: `${fullName} has been assigned.`,
    });
    onComplete();
  }

  const selectedRoom = mockRooms.find((r) => r.id === (roomId || preselectedRoomId));
  const rooms = propertyId ? getPropertyRooms(propertyId) : [];
  const beds = roomId ? getRoomBeds(roomId) : [];
  const availableBeds = beds.filter((b) => !getBedStay(b.id));
  const availableRooms = rooms.filter((r) => {
    if (r.roomType === "single") return !getRoomStay(r.id);
    const rBeds = getRoomBeds(r.id);
    return rBeds.some((b) => !getBedStay(b.id));
  });

  return (
    <div className="space-y-6">
      {/* Step indicators */}
      <div className="flex items-center justify-center gap-2">
        {steps.map((step, idx) => (
          <div key={step} className="flex items-center gap-1">
            <div
              className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-medium transition-colors ${
                idx < currentStepIndex
                  ? "bg-primary text-primary-foreground"
                  : idx === currentStepIndex
                  ? "bg-primary text-primary-foreground ring-2 ring-primary/30"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              {idx < currentStepIndex ? <Check className="h-3.5 w-3.5" /> : idx + 1}
            </div>
            {idx < steps.length - 1 && (
              <div className={`h-px w-8 ${idx < currentStepIndex ? "bg-primary" : "bg-border"}`} />
            )}
          </div>
        ))}
      </div>

      {/* Step content */}
      {currentStep === "find_user" && (
        <div className="space-y-4">
          <h3 className="font-medium text-foreground">Find Tenant by Email</h3>
          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <div className="flex gap-2">
              <Input
                id="email"
                type="email"
                placeholder="tenant@example.com"
                value={email}
                onChange={(e) => { setEmail(e.target.value); setUserFound(null); }}
              />
              <Button variant="secondary" onClick={handleSearchUser} disabled={!email.trim()}>
                <Search className="h-4 w-4" />
              </Button>
            </div>
          </div>
          {userFound === true && (
            <Badge className="bg-status-vacant/10 text-status-vacant border-status-vacant/20">
              User found! Details will be prefilled.
            </Badge>
          )}
          {userFound === false && (
            <Badge variant="outline" className="text-muted-foreground">
              No existing user found. You'll fill in details next.
            </Badge>
          )}
          <div className="flex justify-end">
            <Button onClick={handleNext} disabled={!email.trim()}>
              Continue <ArrowRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        </div>
      )}

      {currentStep === "user_details" && (
        <div className="space-y-4">
          <h3 className="font-medium text-foreground">Tenant Details</h3>
          <div className="space-y-3">
            <div className="space-y-2">
              <Label>Email</Label>
              <Input value={email} disabled className="bg-muted" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name</Label>
              <Input id="fullName" value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="John Doe" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="9876543210" />
            </div>
            <div className="space-y-2">
              <Label>Gender</Label>
              <Select value={gender} onValueChange={(v) => setGender(v as Gender)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex justify-between">
            <Button variant="outline" onClick={handleBack}>
              <ArrowLeft className="h-4 w-4 mr-1" /> Back
            </Button>
            <Button onClick={handleNext} disabled={!fullName.trim() || !phone.trim()}>
              Continue <ArrowRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        </div>
      )}

      {currentStep === "location" && (
        <div className="space-y-4">
          <h3 className="font-medium text-foreground">Select Location</h3>
          <div className="space-y-3">
            <div className="space-y-2">
              <Label>Property</Label>
              <Select value={propertyId} onValueChange={(v) => { setPropertyId(v); setRoomId(""); setBedId(""); }}>
                <SelectTrigger><SelectValue placeholder="Select property" /></SelectTrigger>
                <SelectContent>
                  {mockProperties.map((p) => (
                    <SelectItem key={p.id} value={p.id}>{p.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            {propertyId && (
              <div className="space-y-2">
                <Label>Room</Label>
                <Select value={roomId} onValueChange={(v) => { setRoomId(v); setBedId(""); }}>
                  <SelectTrigger><SelectValue placeholder="Select room" /></SelectTrigger>
                  <SelectContent>
                    {availableRooms.map((r) => (
                      <SelectItem key={r.id} value={r.id}>
                        {r.name} ({r.roomType})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
            {roomId && selectedRoom?.roomType === "shared" && (
              <div className="space-y-2">
                <Label>Bed</Label>
                <Select value={bedId} onValueChange={setBedId}>
                  <SelectTrigger><SelectValue placeholder="Select bed" /></SelectTrigger>
                  <SelectContent>
                    {availableBeds.map((b) => (
                      <SelectItem key={b.id} value={b.id}>{b.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>
          <div className="flex justify-between">
            <Button variant="outline" onClick={handleBack}>
              <ArrowLeft className="h-4 w-4 mr-1" /> Back
            </Button>
            <Button
              onClick={handleNext}
              disabled={!roomId || (selectedRoom?.roomType === "shared" && !bedId)}
            >
              Continue <ArrowRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        </div>
      )}

      {currentStep === "stay_details" && (
        <div className="space-y-4">
          <h3 className="font-medium text-foreground">Stay Details</h3>
          <div className="space-y-3">
            <div className="space-y-2">
              <Label htmlFor="startDate">Start Date</Label>
              <Input id="startDate" type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="endDate">End Date (optional)</Label>
              <Input id="endDate" type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="notes">Notes</Label>
              <Textarea id="notes" value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Any additional notes..." />
            </div>
          </div>
          <div className="flex justify-between">
            <Button variant="outline" onClick={handleBack}>
              <ArrowLeft className="h-4 w-4 mr-1" /> Back
            </Button>
            <Button onClick={handleSubmit} disabled={!startDate}>
              Create Stay <Check className="h-4 w-4 ml-1" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
