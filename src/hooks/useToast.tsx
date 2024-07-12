import toast from "react-hot-toast";

interface ToastProps {
  mensaje: string;
}

export const useToast = ({ mensaje }: ToastProps) => {
  const notify = () =>
    toast.success(mensaje, {
      style: { fontSize: "2.2rem" },
    });

  return notify;
};
