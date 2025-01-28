"use client";

import ICompany from "app/types/company";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "app/components/ui/card";

import { useToggle } from "@uidotdev/usehooks";
import classNames from "classnames";
import { Button } from "app/components/ui/button";
import { ExternalLink, FileText, PhoneCall, ShieldCheck } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "app/components/ui/dropdown-menu";
import Link from "next/link";
import { useMemo } from "react";

interface IButtonWithMenu {
  data: {
    icon: React.ReactNode;
    label: string;
    items: {
      text: string;
      url: string;
    }[];
  }
}
function ButtonWithMenu({ data }: IButtonWithMenu) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="icon">
          {data.icon}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-48">
        <DropdownMenuLabel>{data.label}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {data.items.map((item, index) => (
            <Link key={`${item.url}_${index}`} href={item.url} target="_blank">
              <DropdownMenuItem className="cursor-pointer">
                {item.text}
                <DropdownMenuShortcut>
                  <ExternalLink size={15} />
                </DropdownMenuShortcut>
              </DropdownMenuItem>
            </Link>
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}


type ListCompaniesItemProps = {
  company: ICompany;
};
export default function ListCompaniesItem({ company }: ListCompaniesItemProps) {
  const [expanded, toggleExpanded] = useToggle(false);

  const dataProcessing = useMemo(() => {
    return {
      icon: <FileText />,
      label: "Data processing",
      items: [
        {text: "🇪🇸 SPAIN", url: company.link_tratamiento_datos_es},
        {text: "🇺🇸 USA", url: company.link_tratamiento_datos_en},
        {text: "🇵🇹 PORTUGAL", url: company.link_tratamiento_datos_pt},
        {text: "🇫🇷 FRANCE", url: company.link_tratamiento_datos_fr}
      ]
    }
  }, [company]);

  const termsAndConditions = useMemo(() => {
    return {
      icon: <ShieldCheck />,
      label: "Terms and conditions",
      items: [
        {text: "🇪🇸 SPAIN", url: company.link_terminos_condiciones_es},
        {text: "🇺🇸 USA", url: company.link_terminos_condiciones_en},
        {text: "🇵🇹 PORTUGAL", url: company.link_terminos_condiciones_pt},
        {text: "🇫🇷 FRANCE", url: company.link_terminos_condiciones_fr}
      ]
    }
  }, [company]);

  const phone = useMemo(() => {
    return {
      icon: <PhoneCall />,
      label: "Phone",
      items: [
        {text: "🇪🇸 SPAIN", url: company.telefono_contacto_es},
        {text: "🇺🇸 USA", url: company.telefono_contacto_en},
        {text: "🇵🇹 PORTUGAL", url: company.telefono_contacto_pt},
        {text: "🇫🇷 FRANCE", url: company.telefono_contacto_fr}
      ]
    }
  }, [company]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>{company.cod_app}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col">
          <div className="flex flex-col space-y-1.5 items-end">
            <p
              className={classNames("text-sm text-muted-foreground", {
                "line-clamp-3": !expanded,
              })}
            >
              {company.descripcion}
            </p>
            <Button
              variant="outline"
              size="sm"
              onClick={() => toggleExpanded()}
            >
              {expanded ? "Read less..." : "Read more..."}
            </Button>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex items-center justify-between">
        <ButtonWithMenu data={dataProcessing} />
        <ButtonWithMenu data={termsAndConditions} />
        <ButtonWithMenu data={phone} />
      </CardFooter>
    </Card>
  );
}
