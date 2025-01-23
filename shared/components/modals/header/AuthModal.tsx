import React, { PropsWithChildren } from "react";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/shared/components/ui";
import { cn } from "@/shared/lib/utils";
import { LoginForm, RegisterForm } from "@/shared/components/modals/forms/";

interface Props {
  className?: string;
}

export const AuthModal: React.FC<PropsWithChildren<Props>> = ({
  className,
  children,
}) => {
  return (
    <Dialog>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent className={className}>
        <div className={cn("text-white text-xl", className)}>
          <Tabs defaultValue="login">
            <TabsList>
              <TabsTrigger value="login">Вход в аккаунт</TabsTrigger>
              <TabsTrigger value="register">Регистрация</TabsTrigger>
            </TabsList>

            <TabsContent value="login">
              <LoginForm />
            </TabsContent>

            <TabsContent value="register">
              <RegisterForm />
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
};
