{
    'name': 'POS',
    'version': '16.0',
    'summary': 'Module for customize the POS',
    'description': 'Custom Pos Module',
    'sequence': '-100',
    'author': 'Krushal Kalkani',
    'category': 'Sale',
    'depends': ['point_of_sale', 'base'],
    'data': [
        'security/ir.model.access.csv',
        'views/inherit_pos.xml',

    ],

    'assets': {
        'point_of_sale.assets': [
            'custom_pos/static/src/**/*',
        ]
    },


    'installable': True,
    'application': True,
    'auto_install': True,
    'license': 'LGPL-3'
}
