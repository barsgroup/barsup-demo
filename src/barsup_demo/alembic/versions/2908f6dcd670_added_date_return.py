"""Added date return

Revision ID: 2908f6dcd670
Revises: 928a5711f9e
Create Date: 2014-10-27 16:16:28.932673

"""

# revision identifiers, used by Alembic.
revision = '2908f6dcd670'
down_revision = '928a5711f9e'

from alembic import op
import sqlalchemy as sa


def upgrade():
    ### commands auto generated by Alembic - please adjust! ###
    op.add_column('userbook', sa.Column('return_date', sa.Date(), nullable=False))
    ### end Alembic commands ###


def downgrade():
    ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('userbook', 'return_date')
    ### end Alembic commands ###
