export type TransformationStyle = {
  id: string;
  name: string;
  description: string;
  emoji: string;
  gradient: string;
};

export type ProductSize = {
  id: string;
  name: string;
  heightCm: number;
  price: number;
  description: string;
  popular?: boolean;
};

export type PackagingOption = {
  id: string;
  name: string;
  price: number;
  description: string;
};

export type OrderState = {
  drawingPreview: string | null;
  childName: string;
  childAge: string;
  message: string;
  styleId: string | null;
  productId: string | null;
  packagingId: string | null;
  color: string;
  base: string;
  engravedName: string;
  engravedDate: string;
};

export const defaultOrderState: OrderState = {
  drawingPreview: null,
  childName: "",
  childAge: "",
  message: "",
  styleId: null,
  productId: null,
  packagingId: null,
  color: "#5BC8F2",
  base: "round",
  engravedName: "",
  engravedDate: "",
};
