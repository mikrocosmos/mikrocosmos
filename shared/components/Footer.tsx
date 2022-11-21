import React from "react";
import { Container } from "./Container";
import { cn } from "../lib/utils";

interface Props {
  className?: string;
}

export const Footer: React.FC<Props> = ({ className }) => {
  return (
    <footer className={cn("bg-popover py-5", className)}>
      <Container>
        <div className="flex flex-col gap-5 lg:flex-row items-center justify-between text-base">
          <div className="opacity-50 transition hover:opacity-100">
            © {new Date().getFullYear()} Smoky Moon
          </div>
          <div className="opacity-50 transition hover:opacity-100">
            Все права защищены
          </div>
          <div className="opacity-50 transition hover:opacity-100 -link">
            <a href="#">Политика конфиденциальности</a>
          </div>
          <div className="opacity-50 transition hover:opacity-100 -link">
            <a href="#">Пользовательское соглашение</a>
          </div>
        </div>
      </Container>
    </footer>
  );
};
