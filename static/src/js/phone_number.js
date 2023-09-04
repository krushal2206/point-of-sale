odoo.define("pos_training.CustomerDetail", function (require) {
  "use strict";

  const PartnerDetailsEdit = require("point_of_sale.PartnerDetailsEdit");
  const Registries = require("point_of_sale.Registries");
  var { Gui } = require("point_of_sale.Gui");
  const { _lt } = require("@web/core/l10n/translation");

  const CustomerMobile = (PartnerDetailsEdit) =>
    class CustomerMobile extends PartnerDetailsEdit {
      setup() {
        super.setup();
        this.changes.customer_phone_number =
          this.props.partner.customer_phone_number || "";
        console.log(this.changes);
      }

      async saveChanges() {
        // console.log()
        const loadedData = await this.env.services.rpc({
          model: "res.partner",
          method: "search_read",
          args: [
            [
              [
                "customer_phone_number",
                "=",
                this.changes.customer_phone_number,
              ],
              ["id", "!=", this.props.partner.id],
            ],
          ],
        });
        // console.log(loadedData)

        if (loadedData.length > 0) {
          Gui.showPopup("ErrorPopup", {
            title: _lt("Mobile Number"),
            body: _lt(
              `Mobile Number already in use for ${loadedData[0].name}!!`
            ),
          });
        } else {
          super.saveChanges();
        }
      }
    };
  CustomerMobile.template = "pos_training.CustomerMobile";
  Registries.Component.extend(PartnerDetailsEdit, CustomerMobile);
  return CustomerMobile;
});
