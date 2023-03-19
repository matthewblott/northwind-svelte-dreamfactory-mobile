import { modalController as modalControllerOrg, popoverController as popoverControllerOrg, } from "@ionic/core";
/*
TODO - interface needs to translate SvelteComponent type into ComponentRef
Now we have to do this:

const openModal = async (modalComponent: SvelteComponent, formData: {}) => {
    const popover = await modalController.create({
      component: modalComponent as unknown as ComponentRef, // ModalOptions does not eat SvelteComponent
      componentProps: {
        formData,
      },
    });

    popover.onDidDismiss().then((value) => {
      console.log("Dismissed the popover", value);
      if (value.role === "backdrop") console.log("Backdrop clicked");
    });

    await popover.present();
  };
*/
export var modalController = {
    create: function (modalOptions) {
        // @ts-ignore - issue with modalOptions.component not matching
        return Promise.resolve(modalController.__create(modalOptions.component, modalOptions));
    },
    __create: function (component, modalOptions) {
        var divWrapper = document.createElement("div");
        var contentID = "id" + Date.now();
        divWrapper.id = contentID;
        var modalWrapper = document.createElement("ion-modal");
        // console.log('ADDING CSS', modalOptions.cssClass);
        // this part is not working 
        if (modalOptions.cssClass) {
            if (Array.isArray(modalOptions.cssClass)) {
                modalOptions.cssClass.forEach(function (cssClass) {
                    modalWrapper.classList.add(cssClass);
                });
            }
            else
                modalWrapper.classList.add(modalOptions.cssClass);
        }
        ;
        var modalContent = document.createElement("div");
        /* assign properties */
        Object.keys(modalOptions)
            .filter(function (key) { return !['component', 'componentProps'].includes(key); })
            .forEach(function (key) {
            modalWrapper[key] = modalOptions[key];
        });
        divWrapper.appendChild(modalWrapper);
        modalWrapper.appendChild(modalContent);
        document.body.appendChild(divWrapper);
        var svelteComponent = new component({ target: modalContent, props: modalOptions.componentProps });
        modalWrapper.onDidDismiss().then(function () {
            svelteComponent.$destroy();
            divWrapper.remove();
        });
        return modalWrapper;
    },
    dismiss: function (data, role, id) {
        return modalControllerOrg.dismiss(data, role);
    },
    getTop: function () {
        return modalControllerOrg.getTop();
    }
};
export var popoverController = {
    create: function (popoverOptions) {
        // @ts-ignore - issue with popoverOptions.component not matching
        return Promise.resolve(popoverController.__create(popoverOptions.component, popoverOptions));
    },
    __create: function (component, popoverOptions) {
        var divWrapper = document.createElement("div");
        var contentID = "id" + Date.now();
        divWrapper.id = contentID;
        var popoverWrapper = document.createElement("ion-popover");
        // console.log('ADDING CSS', modalOptions.cssClass);
        // this part is not working 
        if (popoverOptions.cssClass) {
            if (Array.isArray(popoverOptions.cssClass)) {
                popoverOptions.cssClass.forEach(function (cssClass) {
                    popoverWrapper.classList.add(cssClass);
                });
            }
            else
                popoverWrapper.classList.add(popoverOptions.cssClass);
        }
        ;
        var popoverContent = document.createElement("div");
        /* assign properties */
        Object.keys(popoverOptions)
            .filter(function (key) { return !['component', 'componentProps'].includes(key); })
            .forEach(function (key) {
            popoverWrapper[key] = popoverOptions[key];
        });
        divWrapper.appendChild(popoverWrapper);
        popoverWrapper.appendChild(popoverContent);
        document.body.appendChild(divWrapper);
        var svelteComponent = new component({ target: popoverContent, props: popoverOptions.componentProps });
        popoverWrapper.onDidDismiss().then(function () {
            svelteComponent.$destroy();
            divWrapper.remove();
        });
        return popoverWrapper;
    },
    dismiss: function (data, role, id) {
        return popoverControllerOrg.dismiss(data, role);
    },
    getTop: function () {
        return popoverControllerOrg.getTop();
    }
};
