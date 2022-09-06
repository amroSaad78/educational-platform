class axiosController {
  static signal() {
    if (axiosController._axiosController) {
      axiosController._axiosController = undefined;
    }
    axiosController._axiosController = new AbortController();
    return axiosController._axiosController.signal;
  }

  static abort() {
    if (!axiosController._axiosController) return;
    axiosController._axiosController.abort();
  }
}
export default axiosController;
