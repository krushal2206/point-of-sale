odoo.define("pos_order.inherit", function (require) {
  "use strict";
  const ProductScreen = require("point_of_sale.ProductScreen");
  const Registries = require("point_of_sale.Registries");
  var { Gui } = require("point_of_sale.Gui");
  const { _lt } = require("@web/core/l10n/translation");

  const CustomerNoteButton = (ProductScreen) =>
    class CustomerNoteButton extends ProductScreen {
      setup() {
        super.setup();
      }
      async onClick() {
        const order = this.env.pos.get_order();
        const { confirmed, payload: order_note } = await this.showPopup(
          "CustomerNotePopup",
          {
            initialNumber: order.getPhone(),
          }
        );
        if (confirmed) {
          order.setPhone(order_note);
        }
      }
      async _onClickPay() {
        if (this.env.pos.get_order().partner == null) {
          Gui.showPopup("ErrorPopup", {
            title: _lt("Customer"),
            body: _lt(`Select a customer.`),
          });
        } else {
          super._onClickPay();
        }
      }
    };
  CustomerNoteButton.template = "pos_task.CustomerNoteButton";
  Registries.Component.extend(ProductScreen, CustomerNoteButton);
});
