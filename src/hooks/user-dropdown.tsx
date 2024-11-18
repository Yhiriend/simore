import { useState } from "react";
import { Avatar, AvatarFallback } from "../components/ui/avatar";
import { ButtonDropdown } from "../components/ui/button-dropdown";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";
import { Settings, LogOut } from "lucide-react";
import React from "react";

interface UserDropdownProps {
  userName: string;
  userEmail: string;
  onLogout: () => void;
  onOpenSettings: () => void;
}

export default function UserDropdown({
  userEmail,
  userName,
  onLogout,
  onOpenSettings,
}: UserDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);

  const initials = userName
    ? userName
        .split(" ")
        .map((name) => name[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "??";

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <ButtonDropdown
          variant="ghost"
          className="relative h-10 w-10 rounded-full"
        >
          <Avatar className="h-10 w-10">
            <AvatarFallback className="bg-primary text-primary-foreground">
              {initials}
            </AvatarFallback>
          </Avatar>
        </ButtonDropdown>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">
              {userName || "Usuario"}
            </p>
            <p className="text-xs leading-none text-muted-foreground">
              {userEmail || "usuario@ejemplo.com"}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={onOpenSettings}>
          <Settings className="mr-2 h-4 w-4" />
          <span>Configuración</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={onLogout}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Cerrar sesión</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
