odoo.define("pos_task.CustomerNotePopup", function (require) {
  "use strict";

  const AbstractAwaitablePopup = require("point_of_sale.AbstractAwaitablePopup");
  const { useState, useRef } = owl;
  const Registries = require("point_of_sale.Registries");
  const { _lt } = require("@web/core/l10n/translation");
  const { Order } = require("point_of_sale.models");

  class CustomerNotePopup extends AbstractAwaitablePopup {
    setup() {
      super.setup();
      this.note = useRef("note");
      this.state_p = useState({ order_note_: this.props.initialNumber });
      this.note = useState({
        error: "",
      });
    }

    getPayload() {
      console.log(this.state_p);
      return this.state_p.order_note_;
    }
  }

  CustomerNotePopup.template = "pos_task.CustomerNotePopup";
  CustomerNotePopup.defaultProps = {
    cancelText: _lt("Cancel"),
    title: _lt("Order Note"),
    save: _lt("Save"),
  };

  Registries.Component.add(CustomerNotePopup);

  const POSCustomerNote = (Order) =>
    class POSCustomerNote extends Order {
      constructor(obj, options) {
        super(...arguments);
      }

      export_as_JSON() {
        const json = super.export_as_JSON(...arguments);
        json.note = this.note;
        return json;
      }

      init_from_JSON(json) {
        super.init_from_JSON(...arguments);
        this.setPhone(json.note);
      }

      setPhone(note) {
        this.note = note;
      }

      getPhone() {
        return this.note;
      }

      export_for_printing() {
        const result = super.export_for_printing(...arguments);
        if (this.getPhone()) {
          result.note = this.getPhone();
        }
        return result;
      }
    };

  Registries.Model.extend(Order, POSCustomerNote);
});
