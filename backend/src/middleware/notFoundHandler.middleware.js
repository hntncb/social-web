export const notFoundHandler = (_req, res, _next) => {
  return res.status(404).json({
    success: false,
    message: 'Endpoint khong ton tai',
  });
};
