import { twMerge } from "tailwind-merge";
import { type ClassValue, clsx } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
};

//Function below is to convert the amount from database to frontend actual amount
export function converAmountFromMiliunites(amount: number) {
  return amount / 1000;
};


//Function below is to convert the amount to store into the database
export function converAmountToMiliunites(amount: number) {
  return Math.round(amount * 1000);
};

export function formatCurrency(value: number) {

  return Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "CAD",
    minimumFractionDigits: 2,
  }).format(value);
};