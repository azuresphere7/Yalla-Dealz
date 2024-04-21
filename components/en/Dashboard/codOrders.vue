<template>
	<v-container>
		<v-card
			class="rounded-0 mb-2"
			:elevation="1"
		>
			<v-card-title>
				{{ title }}
				<v-spacer></v-spacer>
				<v-text-field 
					v-model="search.phone"
					class="mx-5"
					append-icon="mdi-magnify"
					label="Search Phone"
					single-line
					:dense="dense"
					hide-details
				></v-text-field>
				<v-text-field 
					v-model="search.user"
					class="mx-5"
					append-icon="mdi-magnify"
					label="Search User"
					single-line
					:dense="dense"
					hide-details
				></v-text-field>
				<v-text-field 
					v-model="search.merchant"
					class="mx-5"
					append-icon="mdi-magnify"
					label="Search Merchant"
					single-line
					:dense="dense"
					hide-details
				></v-text-field>
			</v-card-title>
		</v-card>
		<v-data-table 
			:headers="headers"
			:items="orders"
			:single-expand="singleExpand"
			:expanded.sync="expanded"
			item-key="_id"
			show-expand
			class="elevation-1 rounded-0"
			:dense="dense"
		>
			<template v-slot:[`item.order.status`]="{ item }">
				<span :class="{'green--text lighten-1': item.order.status == 'paid'}">
					{{ item.order.status == 'paid' ? 'Delivered' :  item.order.status }}
				</span>
			</template>
			<template v-slot:[`item.order.address`]="{ item }">
				{{ item.order.address.split(',')[0].replace('City: ', '') }}
			</template>
			<template v-slot:item.actions="{ item }">
				<v-btn 
					icon
					color="primary"
					@click="send(item)"
					width="100%"
				>
					Confirm
				</v-btn>
			</template>
			<template v-slot:expanded-item="{ item }">
				<td :colspan="headers.length">
					<v-container>
						<v-row justify="center">
							<v-col cols="15">
								<v-card elevation="4">
									<v-data-table 
										dense
										:headers="expandHeaders"
										:items="item.order.deals"
										hide-default-footer
									>
                    <template v-slot:item.order="{ item }">
                      {{ getAddress(item._id) }}
                    </template>
                  </v-data-table>
								</v-card>
							</v-col>
						</v-row>
					</v-container>
				</td>
			</template>
		</v-data-table>
	</v-container>
</template>

<script>
	import { mapActions, mapGetters } from 'vuex';
	export default {
		data() {
			return {
				title: 'List COD Orders',
				search: {
					phone: '',
					user: '',
					merchant: ''
				},
				expanded: [],
				singleExpand: true,
				dense: true,
				headers: [
					{ text: 'First Name', value: 'user.firstName' },
					{ text: 'Last Name', value: 'user.lastName' },
					{ text: 'Phone', value: 'user.phone' },
					{ text: 'Status', value: 'order.status' },
					{ text: 'City', value: 'order.address' },
					{ text: 'Actions', value: 'actions', sortable: false },
					{ text: 'More', value: 'data-table-expand' },
				],
				expandHeaders: [
					{ text: 'Address', value: 'order' },
					{ text: 'Deal Name', value: 'name' },
					{ text: 'Merchant Name', value: 'merchant.name' },
				]
			}
		},
		watch: {
			'search': {
				handler() {
					const exp = `phone=${this.search.phone}&user=${this.search.user}&merchant=${this.search.merchant}`
					this.init(exp)
				},
				deep: true
			},
		},
		computed: {
			...mapGetters({
				orders: 'cashDelivery/orders'
			}),
		},
		methods: {
      ...mapActions({
        getOrders: 'cashDelivery/fetchGetOrders',
				sendOrder: 'cashDelivery/fetchSendOrder'
			}),
      getAddress(id) {
        let map = this.orders.filter(els => {
          if(els.order.deals.find(el => el._id == id)) return els
        })
        return map[0].chargeTo
      },
			async init(val = '') {
				await this.getOrders(val)
					.then(() => { })
					.catch(err => this.$store.dispatch('settings/activeMsg', { text: err.message, color: 'red' }));
			},
			async send(data) {
				await this.sendOrder({ code: data.code })
					.then(() => {
						this.$store.dispatch('settings/activeMsg', { text: 'Success', color: 'success' })
						this.init()
					})
					.catch(err => {
						let mess = err.message
						if (err.response && err.response.data) mess = err.response.data.message || err.response.data.error || err.response.data.length;
						this.$store.dispatch('settings/activeMsg', { text: mess, color: 'red' });
					})
			}
		},
		async mounted() {
			await this.init()
		}
	}
</script>