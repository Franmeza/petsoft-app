import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import ActionButton from "./action-button";
import { PlusIcon } from "@radix-ui/react-icons";
import PetForm from "./pet-form";
import { useState } from "react";
import { flushSync } from "react-dom";

function DialogTriggerComponent({ action }: { action: string }) {
  const [isFormOpen, setIsFormOpen] = useState(false);

  return (
    <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
      <DialogTrigger asChild>
        {action === "Add" ? (
          <ActionButton buttonSize="icon">
            <PlusIcon className="h-6 w-6" />
          </ActionButton>
        ) : (
          <ActionButton variant="secondary">Edit</ActionButton>
        )}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {action === "Add" ? "Add new pet" : "Edit Pet Information"}
          </DialogTitle>
        </DialogHeader>
        <PetForm
          actionType={action}
          onFormSubmssion={() => setIsFormOpen(false)}
        />
      </DialogContent>
    </Dialog>
  );
}

export default DialogTriggerComponent;
