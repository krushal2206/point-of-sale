from odoo import fields, models, api


class PosOrder(models.Model):
    _inherit = "pos.order"

    note = fields.Char()

    @api.model
    def _order_fields(self, ui_order):
        res = super(PosOrder, self)._order_fields(ui_order)
        # res['note'] = ui_order['note'] if ui_order['note'] else False
        res.update({
            'note': ui_order.get('note'),
        })
        return res


class CustomerMobile(models.Model):
    _inherit = ['res.partner']

    customer_phone_number = fields.Char(string="Mobile Number")


class CustomerMobilePosSession(models.Model):
    _inherit = ['pos.session']

    def _loader_params_res_partner(self):
        result = super()._loader_params_res_partner()
        result.get('search_params').get(
            'fields').append('customer_phone_number')
        return result
