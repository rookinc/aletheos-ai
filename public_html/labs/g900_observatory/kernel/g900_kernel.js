export const G900_KERNEL_VERSION = "hello-001";

export function getKernelHello() {
  return {
    ok: true,
    label: "G900 kernel online",
    version: G900_KERNEL_VERSION,
    layer: "hello"
  };
}
