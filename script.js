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
            Contacts.store.push(entry);
        },
        /*****************************************************************************
         * Removes the given contact entry from the store.
         *****************************************************************************/
        storeRemove: function(entry) {
            Contacts.store = jQuery.grep(Contacts.store, function(contact) {
                return contact.id !== entry.id;
            });
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
            Contacts.$table.find("tbody").append($entry_row);
        },

        /*****************************************************************************
         * Removes the given entry from the contacts table.
         *****************************************************************************/
        tableRemove: function(entry) {
            jQuery("#entry-" + entry.id).remove();
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

            var entry = matched_entries[0]
            // Remove contact entry after confirmation
            Contacts.storeRemove(entry);
            Contacts.tableRemove(entry);
        }
    };

    Contacts.init();
})();
