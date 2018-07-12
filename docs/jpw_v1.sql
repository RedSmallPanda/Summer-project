/*==============================================================*/
/* DBMS name:      MySQL 5.0                                    */
/* Created on:     2018/7/12 13:53:14                           */
/*==============================================================*/


drop table if exists Admin;

drop table if exists Collection;

drop table if exists Comment;

drop table if exists Coupon;

drop table if exists Orders;

drop table if exists Refund;

drop table if exists ShopCart;

drop table if exists Shows;

drop table if exists Ticket;

drop table if exists User;

drop table if exists User_Coupon;

/*==============================================================*/
/* Table: Admin                                                 */
/*==============================================================*/
create table Admin
(
   admin_id             int,
   username             text,
   password             text,
   level                int
);

/*==============================================================*/
/* Table: Collection                                            */
/*==============================================================*/
create table Collection
(
   user_id              int not null,
   show_id              int not null,
   primary key (user_id, show_id)
);

/*==============================================================*/
/* Table: Comment                                               */
/*==============================================================*/
create table Comment
(
   comment_id           int not null,
   user_id              int,
   ticket_id            int,
   parent_id            int,
   content              text,
   rate                 int,
   thread               text,
   primary key (comment_id)
);

/*==============================================================*/
/* Table: Coupon                                                */
/*==============================================================*/
create table Coupon
(
   coupon_id            int not null,
   title                text,
   discount             int,
   disc_cond          	int,
   begindate            date,
   enddate              date,
   primary key (coupon_id)
);

/*==============================================================*/
/* Table: "Order"                                               */
/*==============================================================*/
create table Orders
(
   order_id             int not null,
   ticket_id            int,
   user_id              int,
   number               int,
   state                text,
   time                 datetime,
   primary key (order_id)
);

/*==============================================================*/
/* Table: Refund                                                */
/*==============================================================*/
create table Refund
(
   order_id             int not null,
   state                text,
   reason               text,
   primary key (order_id)
);

/*==============================================================*/
/* Table: ShopCart                                              */
/*==============================================================*/
create table ShopCart
(
   ticket_id            int,
   user_id              int,
   number               int
);

/*==============================================================*/
/* Table: Show                                                  */
/*==============================================================*/
create table Shows
(
   show_id              int not null,
   title                text,
   info                 text,
   city                 text,
   type                 text,
   address              text,
   rate                 int,
   primary key (show_id)
);

/*==============================================================*/
/* Table: Ticket                                                */
/*==============================================================*/
create table Ticket
(
   ticket_id            int not null,
   show_id              int,
   time                 datetime,
   price                int,
   seat                 text,
   amount               int,
   stock                int,
   primary key (ticket_id)
);

/*==============================================================*/
/* Table: User                                                  */
/*==============================================================*/
create table User
(
   user_id              int not null,
   username             text,
   password             text,
   gender               text,
   birthday             date,
   nickname             text,
   phone                text,
   email                text,
   primary key (user_id)
);

/*==============================================================*/
/* Table: User_Coupon                                           */
/*==============================================================*/
create table User_Coupon
(
   user_id              int not null,
   coupon_id            int not null,
   number               int,
   primary key (user_id, coupon_id)
);

alter table Collection add constraint FK_Reference_3 foreign key (user_id)
      references User (user_id) on delete restrict on update restrict;

alter table Collection add constraint FK_Reference_8 foreign key (show_id)
      references Shows (show_id) on delete restrict on update restrict;

alter table Comment add constraint FK_Reference_1 foreign key (user_id)
      references User (user_id) on delete restrict on update restrict;

alter table Comment add constraint FK_Reference_2 foreign key (ticket_id)
      references Shows (show_id) on delete restrict on update restrict;

alter table Orders add constraint FK_Reference_10 foreign key (ticket_id)
      references Ticket (ticket_id) on delete restrict on update restrict;

alter table Orders add constraint FK_Reference_9 foreign key (user_id)
      references User (user_id) on delete restrict on update restrict;

alter table Refund add constraint FK_Reference_12 foreign key (order_id)
      references Orders (order_id) on delete restrict on update restrict;

alter table ShopCart add constraint FK_Reference_13 foreign key (user_id)
      references User (user_id) on delete restrict on update restrict;

alter table ShopCart add constraint FK_Reference_14 foreign key (ticket_id)
      references Ticket (ticket_id) on delete restrict on update restrict;

alter table Ticket add constraint FK_Reference_7 foreign key (show_id)
      references Shows (show_id) on delete restrict on update restrict;

alter table User_Coupon add constraint FK_Reference_5 foreign key (user_id)
      references User (user_id) on delete restrict on update restrict;

alter table User_Coupon add constraint FK_Reference_6 foreign key (coupon_id)
      references Coupon (coupon_id) on delete restrict on update restrict;

