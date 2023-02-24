mergeInto(LibraryManager.library, {
    ReceiveProgramData: function (programJSON) {
      try {
        window.dispatchReactUnityEvent("ReceiveProgramData", UTF8ToString(programJSON));
      } catch (e) {
        console.warn("Failed to dispatch event");
      }
    },
  });