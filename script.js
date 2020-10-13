/*
  Tasks:
    1) Implement method 'Contacts.storeAdd'.
    2) Implement method 'Contacts.tableAdd' (append entry row to table).
    3) Implement method 'Contacts.storeRemove'.
    4) Implement method 'Contacts.tableRemove'.
    5) Optional: Sort contact entries by name.
*/
(function(){
    "use strict";

    var Contacts = {
        /******************************************************************************
         * Contacts storage. Example entry:
         * {
         *    id: 1,
         *    first_name: "John",
         *    last_name: "Smith",
         *    email: "john@example.com"
         * }
         ******************************************************************************/
        store: [],

        $table: jQuery("#contacts-table"),
        $form: jQuery("#contacts-form"),
        $button_save: jQuery("#contacts-btn-save"),
        $button_discard: jQuery("#contacts-btn-discard"),

        /*****************************************************************************
         * Initializes the contacts app.
         *****************************************************************************/
        init: function() {
            // Add event listeners
            Contacts.$button_discard.click(Contacts.onDiscard);
            Contacts.$form.submit(Contacts.onSubmit);
        },

        /*****************************************************************************
         * Saves the given contact entry in the store.
         *****************************************************************************/
        storeAdd: function(entry) {
            /* Remove code. To be implemented by candidate. */
            /* Start Task 1 */
            Contacts.store.push(entry);
            /* End Task 1 */
        },
        /*****************************************************************************
         * Removes the given contact entry from the store.
         *****************************************************************************/
        storeRemove: function(entry) {
            /* Remove code. To be implemented by candidate. */
            /* Start Task 3 */
            Contacts.store = jQuery.grep(Contacts.store, function(contact) {
                return contact.id !== entry.id;
            });
            /* End Task 3 */
        },

        /*****************************************************************************
         * Adds the given entry to the contacts table.
         *****************************************************************************/
        tableAdd: function(entry) {
            var $entry_row = jQuery('<tr></tr>').attr("id", "entry-" + entry.id),
                $entry_cell = jQuery('<td></td>'),
                $entry_remove = jQuery('<a data-op="remove">Remove</a>').click(Contacts.onRemove);

            // Add contact attributes to the row.
            jQuery.each(
                ["id", "first_name", "last_name", "email"],
                function(index, value) {
                    $entry_row.append(
                        $entry_cell.clone().text(entry[value])
                    );
                }
            );

            // Add action cell.
            $entry_row.append(
                $entry_cell.clone()
                    .append(
                        $entry_remove.clone(true).attr("data-id", entry.id)
                    )
            );

            // Add the contact entry (row) to the table.
            /* Remove code. To be implemented by candidate. */
            /* Start Task 2 */
            Contacts.$table.find("tbody").append($entry_row);
            /* End Task 2 */
        },

        /*****************************************************************************
         * Removes the given entry from the contacts table.
         *****************************************************************************/
        tableRemove: function(entry) {
            /* Remove code. To be implemented by candidate. */
            /* Start Task 4 */
            jQuery("#entry-" + entry.id).remove();
            /* End Task 4 */
        },

        /*****************************************************************************
         * Stores the entered contact, adds the entry to the table
         * and resets the form.
         *****************************************************************************/
        onSubmit: function(event) {
            var entry = {
                id: Contacts.store.length,
                first_name: this.first_name.value,
                last_name: this.last_name.value,
                email: this.email.value
            };

            Contacts.storeAdd(entry);
            Contacts.tableAdd(entry);

            this.reset();

            event.preventDefault();
        },

        /*****************************************************************************
         * Resets the contacts form.
         *****************************************************************************/
        onDiscard: function(event) {
            Contacts.$form.trigger("reset");
        },

        /*****************************************************************************
         * Removes a contact entry from the table and storage.
         *****************************************************************************/
        onRemove: function() {
            var entry_id = parseInt( jQuery(this).attr('data-id') ),
                matched_entries = jQuery.grep(Contacts.store, function(contact) {
                    return contact.id === entry_id;
                });

            if(matched_entries.length !== 1)
                return;

            var entry = matched_entries[0],
                confirm_msg = 'Are you sure you want to remove "' +
                              entry.first_name +
                              ' ' +
                              entry.last_name +
                              '" from your contacts?';

            // Remove contact entry after confirmation
            if ( confirm(confirm_msg) ) {
                Contacts.storeRemove(entry);
                Contacts.tableRemove(entry);
            }
        }
    };

    Contacts.init();
})();
