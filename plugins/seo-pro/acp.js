export default function init(kernel) {
  const { bus, state, storage, logger } = kernel;

  bus.on('fme:ready', () => {
    logger.info('[seo-pro] pornit');
    // logică plugin
  });

  // Returnează cleanup pentru uninstall
  return () => {
    bus.off('fme:ready');
  };
}