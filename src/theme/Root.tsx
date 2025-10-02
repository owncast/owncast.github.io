import React, { useEffect } from 'react';

export default function Root({children}) {
  useEffect(() => {
    // Load Kapa.ai widget script
    const script = document.createElement('script');
    script.src = 'https://widget.kapa.ai/kapa-widget.bundle.js';
    script.async = true;
    script.setAttribute('data-website-id', '55b09629-230a-489b-9b76-98ae23ec0d8d');
    script.setAttribute('data-project-name', 'Owncast');
    script.setAttribute('data-project-color', '#6544e9');
    script.setAttribute('data-project-logo', 'https://avatars.githubusercontent.com/u/69942503?s=280&v=4');
    script.setAttribute('data-button-text', 'Help?');
    script.setAttribute('data-button-animation-enabled', 'false');
    script.setAttribute('data-modal-title', 'Owncast Help');
    script.setAttribute('data-modal-disclaimer', 'This is a chat bot trained on the [Owncast documentation](https://owncast.online/docs/). It only knows what the documentation knows, so you can find the same answers it can by reading.');
    script.setAttribute('data-modal-example-questions', 'What kind of server do I need to run Owncast?,How do I install Owncast?,What is Owncast useful for?,How do I stop buffering for my viewers?');
    script.setAttribute('data-modal-body-bg-color', '#e2e8f0');
    script.setAttribute('data-modal-header-bg-color', '#2d3748');
    script.setAttribute('data-modal-ask-ai-input-placeholder', 'Ask a question about Owncast...');
    script.setAttribute('data-modal-title-color', '#ffffff');
    script.setAttribute('data-switch-bg-color', 'transparent');

    document.head.appendChild(script);

    return () => {
      // Cleanup on unmount
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
  }, []);

  return <>{children}</>;
}
