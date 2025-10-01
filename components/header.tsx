"use client";

import { Button } from "@/components/ui/button";
import { Menu, Languages } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/contexts/language-context";
import { useEffect } from "react";

export function Header() {
  const { language, setLanguage, t } = useLanguage();

  // Debug function to test if context is working
  // const handleLanguageChange = (lang: "fr" | "en") => {
  //   console.log('Language change clicked:', lang)
  //   setLanguage(lang)
  //   console.log('New language should be:', lang)
  // }
  const handleLanguageChange = (lang: "fr" | "en") => {
    // Add more detailed debugging
    console.log("Current language:", language);
    console.log("Changing to:", lang);
    try {
      setLanguage(lang);
      console.log("Language changed successfully");
    } catch (error) {
      console.error("Error changing language:", error);
    }
  };

  useEffect(() => {
    console.log("Language in component:", language);
  }, [language]);

  const navItems = [
    { name: t("header.home"), href: "#" },
    { name: t("header.features"), href: "#features" },
    { name: t("header.pricing"), href: "#pricing" },
    { name: t("header.contact"), href: "#contact" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center space-x-3">
            <Image
              src="/logo-fibem.jpg"
              alt="FIBEM Logo"
              width={120}
              height={40}
              className="h-10 w-auto"
            />
            <div className="font-playfair text-2xl font-bold text-primary tracking-wide">
              FIBEM STOCK
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-sm font-medium text-muted-foreground hover:text-accent transition-colors"
              >
                {item.name}
              </a>
            ))}
            <div className="flex items-center space-x-4">
              {/* Language Selector */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-9 w-9 border border-border/40"
                  >
                    <Languages className="h-4 w-4" />
                    <span className="sr-only">Change language</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="z-[100]"
                  sideOffset={8}
                >
                  <DropdownMenuLabel>Language</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={() => handleLanguageChange("fr")}
                    className={language === "fr" ? "bg-accent" : ""}
                  >
                    <span className="mr-2">🇫🇷</span>
                    Français
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => handleLanguageChange("en")}
                    className={language === "en" ? "bg-accent" : ""}
                  >
                    <span className="mr-2">🇺🇸</span>
                    English
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <Link href="/dashboard">
                <Button variant="outline" size="sm">
                  {t("header.dashboard")}
                </Button>
              </Link>
              <Link href="/connexion">
                <Button variant="default" size="sm">
                  {t("header.login")}
                </Button>
              </Link>
            </div>
          </nav>

          {/* Mobile Navigation */}
          <Sheet>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="sm">
                <Menu className="h-5 w-5" />
                <span className="sr-only">{t("header.toggleMenu")}</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <nav className="flex flex-col space-y-4 mt-6">
                {navItems.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="text-sm font-medium text-muted-foreground hover:text-accent transition-colors"
                  >
                    {item.name}
                  </a>
                ))}

                {/* Language Selector for Mobile */}
                <div className="pt-2 border-t">
                  <p className="text-xs font-medium text-muted-foreground mb-2 px-2">
                    Language
                  </p>
                  <div className="flex flex-col space-y-1">
                    <Button
                      variant={language === "fr" ? "secondary" : "ghost"}
                      size="sm"
                      className="w-fit justify-start"
                      onClick={() => handleLanguageChange("fr")}
                    >
                      <span className="mr-2">🇫🇷</span>
                      Français
                    </Button>
                    <Button
                      variant={language === "en" ? "secondary" : "ghost"}
                      size="sm"
                      className="w-fit justify-start"
                      onClick={() => handleLanguageChange("en")}
                    >
                      <span className="mr-2">🇺🇸</span>
                      English
                    </Button>
                  </div>
                </div>

                <Link href="/dashboard">
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-fit bg-transparent"
                  >
                    {t("header.dashboard")}
                  </Button>
                </Link>
                <Link href="/connexion">
                  <Button variant="default" size="sm" className="w-fit">
                    {t("header.login")}
                  </Button>
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
